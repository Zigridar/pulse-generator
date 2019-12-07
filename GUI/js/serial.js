const SerialPort = require('serialport');
//console.log(SerialPort.parsers);

//connect variables
let globalPort;
let connectionStatus = false;
let errorStatus = false;
let globalChartState = true;

//option variables
//MC_1
let globalFrequency = 1;
let globalStateGenerator = 0;
//MC_2
let globalVoltage = 0;
let globalStateVoltage = 0;
let globalDeviceAddress = 1;

//intervals
let timer_1;
let timer_2;
let isClosed;

//initialize connection
function connect(nodevice, errorCallBack, successCallBack) {
  return new Promise(async ok => {
    const ports = await SerialPort.list();
      if(ports.length == 0) {
        //There aren't any available devices
        //do something
        nodevice();
        ok(console.log('error'));
      }
      else {
        ports.forEach(item => {
          if(item.productId == '7523' && !connectionStatus) {
            globalPort = new SerialPort(item.comName, {baudRate: 9600});
            //open event handler
            globalPort.on('open', () => {
              console.log('port has been opened');
              errorStatus = false;
              connectionStatus = true;
              setTimeout(function () {
                timer_2 = setInterval(function () {
                  serialWriteMC_2(globalDeviceAddress, globalStateVoltage, globalVoltage);
                }, 500);
                setTimeout(function () {
                  isClosed = false;
                  successCallBack();
                  timer_1 = setInterval(function () {
                    serialWriteMC_1(globalStateGenerator, globalFrequency);
                  }, 500);
                }, 100);
              }, 2000);
            });
            //error event handler
            globalPort.on('error', (err) => {
              console.log('device has been disconnected');
              //do something
              if (!errorStatus && !isClosed) {
                errorStatus = true;
                connectionStatus = false;
                clearInterval(timer_1);
                clearInterval(timer_2);
                errorCallBack();
              }
            });
            //close event handler
            globalPort.on('close', () => {
              console.log('port has been closed');
              //do something
              if (!errorStatus && !isClosed) {
                isClosed = true;
                connectionStatus = false;
                clearInterval(timer_1);
                clearInterval(timer_2);
                errorCallBack();
              }
            });
            //data event handler
            let connectMC_1 = false;
            let connectMC_2 = false;

            let connectionTimer_MC1;
            let connectionTimer_MC2;

            globalPort.on('data', async (data) => {
              //do something
              if(data[0] == 58) {        //MC_2

                updateMC_2(data);
                clearTimeout(connectionTimer_MC2);
                //if MC_2 doesn't reply
                connectionTimer_MC2 = setTimeout(function () {
                  connectMC_2 = false;
                  $('#vip-card').removeClass('green');
                  $('#vip-card').addClass('red');
                  $('#vip-card').html('ВИП-40 is disconnected');
                }, 2000);

                if(!connectMC_2) {
                  connectMC_2 = true;
                  $('#vip-card').addClass('green');
                  $('#vip-card').removeClass('red');
                  $('#vip-card').html('ВИП-40 is connected');
                }
              }
              else if(data[0] == 100) {  //MC_1

                updateMC_1(data);
                clearTimeout(connectionTimer_MC1);
                //if MC_1 doesn't reply
                connectionTimer_MC1 = setTimeout(function () {
                  connectMC_1 = false;
                  $('#generator-card').removeClass('green');
                  $('#generator-card').addClass('red');
                  $('#generator-card').html('Generator is disconnected');
                }, 2000);

                if(!connectMC_1) {
                  connectMC_1 = true;
                  $('#generator-card').addClass('green');
                  $('#generator-card').removeClass('red');
                  $('#generator-card').html('Generator is connected');
                }
              }
            });
            ok();
          }
          else {
            //there isn't device
            ok(console.log('error'));
          }
        });
      }
  });
}

function disconnect(foo) {
  if (connectionStatus) {
    //turn on/off generator timers
    clearInterval(timerOn);
    clearInterval(timerOff);
    //data sending timer
    clearInterval(timer_1);
    clearInterval(timer_2);
    isClosed = true;
    connectionStatus = false;
    globalVoltage = 0;
    globalFrequency = 1;
    globalStateVoltage = 0;
    globalStateGenerator = 0;
    globalPort.close();
    setTimeout(function () {
      foo();
    }, 300);
  }
}

//rank partition
function rankPartition(number) {
  return new Promise(ok => {
    let rankArr = [];
    rankArr.push(Math.floor(number/100));
    rankArr.push(Math.floor((number - rankArr[0]*100)/10));
    rankArr.push(Math.floor(number - rankArr[0]*100 - rankArr[1]*10));

    //to ASCII
    rankArr[0] += 48;
    rankArr[1] += 48;
    rankArr[2] += 48;
    ok(rankArr);
  });
}

//average
function average(arr) {
  return new Promise(ok => {
    let sum = 0;
    arr.forEach(item => {
      sum += (+item);
    });
    ok(sum / (arr.length));
  });
}

//write data
async function serialWriteMC_1(state, frequency) {
  //calcute control sum
  const controlSum = (+state) + (+frequency);
  //build data array
  //[addres, state, ',', f1, f2, f3, ',', s1, s2, s3]
  let data = [100, state + 48, 44];
  const rankFrequency = await rankPartition(frequency);
  const rankSum =await rankPartition(controlSum);
  data = data.concat(rankFrequency);
  data.push(44);
  data = data.concat(rankSum);
  globalPort.write(Buffer.from(data));
  console.log('Sent to MC_1: ' + Buffer.from(data).toString());
}

async function serialWriteMC_2(address, state, voltage) {
  //calcute control sum
  const controlSum = (+address) + (+state) + (+voltage);
  //build data array
  //[address, deviceAddress, ',', state, ',', v1, v2, v3, ',', s1, s2, s3]
  let data = [58, address + 48, 44, state + 48, 44];
  const rankVoltage = await rankPartition(voltage);
  const rankSum = await rankPartition(controlSum);
  data = data.concat(rankVoltage);
  data.push(44);
  data = data.concat(rankSum);
  //Don't delete example
  // data = [58, 49, 44, 48, 44, 49, 53, 48, 44 , 49, 53, 49];
  globalPort.write(Buffer.from(data));
  console.log('Sent to MC_2: ' + Buffer.from(data).toString());
}

//data had been received from MC_1
let count = 0;
let averageDots = 1
let dotStorage = [];

async function updateMC_1(dataArr) {
  console.log('Reseived from MC_1: ' + dataArr.toString());
  //data parsing
  const vacuum = (+dataArr[1] - 48)*100 + +(dataArr[2] - 48)*10 + (+dataArr[3] - 48);
  const anyByte = (+dataArr[5] - 48)*100 + (+dataArr[6] - 48)*10 + (+dataArr[7] - 48);
  const controlSum = (+dataArr[9] - 48)*100 + (+dataArr[10] - 48)*10 + (+dataArr[11] - 48);

  //update chart
  if(globalChartState) {
    dotStorage[count] = +vacuum;
    count++;

    //no average
    if(averageDots == 1) {
      addData(myChart, vacuum, dotCount);
      count = 0;
    }

    //average
    if((count == averageDots) && (averageDots != 1)) {
      const middle = await average(dotStorage);
      addData(myChart, middle, dotCount);
      dotStorage = [];
      count = 0;
    }
    $('#vacuum-gauge-value').html('Vacuum gauge: ' + vacuum + ' Pa');
  }
}

//data had been received from MC_2
function updateMC_2(dataArr) {
  console.log('Reseived from MC_2: ' + dataArr.toString());
  //data parsing
  const state_voltage = (+dataArr[3] - 48);
  const voltage = (+dataArr[5] - 48)*10 + (+dataArr[6] - 48) + ',' + (+dataArr[7] - 48);
  const current = (+dataArr[9] - 48)*100 + (+dataArr[10] - 48)*10 + (+dataArr[11] - 48);
  const state = +dataArr[13] - 48;
  const controlSum = (+dataArr[15] - 48)*100 + (+dataArr[16] - 48)*10 + (+dataArr[17] - 48);

  let error_text;
  switch (state) {
    case 0:
      error_text = 'Ошибок нет'
      $('#error-text').removeClass('red');
      $('#error-text').addClass('green');
      break;
    case 1:
      error_text = 'КЗ в нагрузке'
      $('#error-text').addClass('red');
      $('#error-text').removeClass('green');
      break;
    case 2:
      error_text = 'Нет воды'
      $('#error-text').addClass('red');
      $('#error-text').removeClass('green');
      break;
    case 3:
      error_text = 'Защита по току'
      $('#error-text').addClass('red');
      $('#error-text').removeClass('green');
      break;
    case 4:
      error_text = 'КЗ в баке'
      $('#error-text').addClass('red');
      $('#error-text').removeClass('green');
      break;
    case 5:
      error_text = 'Блокировка'
      $('#error-text').addClass('red');
      $('#error-text').removeClass('green');
      break;
  }
  //update display variables
  $('#real-voltage').html(voltage + ' kV');
  $('#current').html(current + ' mA');
  $('#error-text').html(error_text);
}
