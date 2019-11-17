const SerialPort = require('serialport');

let globalPort;
let connectionStatus = false;
let errorStatus = false;


//initialize connection
function connect() {
  return new Promise(ok => {
    SerialPort.list((err, ports) => {
      if(ports.length == 0) {
        //There aren't any available devices
        //do something
        ok(console.log('error'));
      }
      else {
        ports.forEach(item => {
          if(item.productId == '7523') {
            globalPort = new SerialPort(item.comName, {baudRate: 9600});
            //open event handler
            globalPort.on('open', () => {
              console.log('port has been opened');
              errorStatus = false;
              connectionStatus = true;
              setTimeout(function () {
                serialWrite([58, 1, 44, 1, 44, 3, 5, 7, 44, 3, 5, 9]);
                setTimeout(function () {
                  serialWrite([255, 1, 44, 1, 5, 6, 44, 1, 5, 7]);
                }, 50);
              }, 2000);
            });
            //error event handler
            globalPort.on('error', (err) => {
              console.log('device has been disconnected');
              //do something
              if (!errorStatus) {
                errorStatus = true;
                connectionStatus = false;
              }
            });
            //close event handler
            globalPort.on('close', () => {
              console.log('port has been closed');
              //do something
              if (!errorStatus) {
                errorStatus = true;
                connectionStatus = false;
              }
            });
            //data event handler
            let count = 0; //debug
            globalPort.on('data', (data) => {
              console.log(count++); //debug
              //do something
              if(data[0] == 58) {        //MC_2
                updateMC_2(data)
              }
              else if(data[0] == 255) {  //MC_1
                updateMC_1(data)
              }
            });
            ok();
          }
        });
      }
    });
  });
}


//write data
function serialWrite(dataArr) {
  globalPort.write(Buffer.from(dataArr));
}

//data had been received from MC_1
let count = 0;
function updateMC_1(dataArr){
  //data parsing
  const vacuum = '' + dataArr[1] + dataArr[2] + dataArr[3];
  const anyByte = '' + dataArr[5] + dataArr[6] + dataArr[7];
  const controlSum = '' + dataArr[9] + dataArr[10] + dataArr[11];

  //change to real names
  $('#vacuum').html('Vacuum: ' + vacuum);
  addData(myChart, count++, +vacuum);
  setTimeout(function () {
    serialWrite([255, 1, 44, 1, 5, 6, 44, 1, 5, 7]);
  }, 200);
}

//data had been received from MC_2
function updateMC_2(dataArr) {
  const state_voltage = '' + dataArr[3];
  const voltage = '' + dataArr[5] + dataArr[6] + dataArr[7];
  const current = '' + dataArr[9] + dataArr[10] + dataArr[11];
  const state = '' + dataArr[13];
  const controlSum = '' + dataArr[15] + dataArr[16] + dataArr[17];

  //change to real names
  $('#voltage').html('Voltage: ' + voltage);
  $('#current').html('Current: ' + current);
  $('#state').html('Error: ' + state);

  setTimeout(function () {
    serialWrite([58, 1, 44, 1, 44, 3, 5, 7, 44, 3, 5, 9]);
  }, 200);
}

//replace to button
// (async() => {
//   await connect();
// })()
