const SerialPort = require('serialport');

SerialPort.list((err, ports) => {
  console.log('ports', ports);
});
