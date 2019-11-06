const serialport = require('serialport')

serialport.list((err, ports) => {
  console.log('ports', ports);
});
