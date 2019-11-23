'use strict'

const electron = require('electron');
const ipcRender = electron.ipcRenderer;

//input-voltage + range-voltage
$('#range-voltage').bind('input', () => {
  $('#input-voltage').val($('#range-voltage').val());
});

$('#input-voltage').bind('input', () => {
  $('#range-voltage').val($('#input-voltage').val());
});

//input-frequency + range-frequency
$('#range-frequency').bind('input', () => {
  $('#input-frequency').val($('#range-frequency').val());
});

$('#input-frequency').bind('input', () => {
  $('#range-frequency').val($('#input-frequency').val());
});

//toggle switch voltage
$('#switch-voltage').click(() => {
  if(!$('#switch-voltage').prop('checked')) {
    globalStateVoltage = 0;
  }
  else {
    globalStateVoltage = 1;
  }
});


//toggle switch frequency
$('#switch-frequency').click(() => {
  if(!$('#switch-frequency').prop('checked')) {
    globalStateGenerator = 0;
    // $('#range-frequency').attr('disabled', '');
    // $('#range-frequency').val(1);
    // $('#input-frequency').attr('disabled', '');
    // $('#input-frequency').val(1);
    // $('#set_frequency').attr('disabled', '')
  }
  else {
    localStateGenerator = 1;
    // $('#range-frequency').removeAttr('disabled');
    // $('#input-frequency').removeAttr('disabled');
    // $('#set_frequency').removeAttr('disabled');
  }
});

//connect button
$('#connect-button').click(async () => {
  function nodevice() {
    $('#connect-button').removeAttr('disabled');
    $('#disconnect-button').attr('disabled', '');

    Swal.fire({
      title: 'There aren`t any available devices',
      icon: 'error',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }

  function error() {
    $('#connect-button').removeAttr('disabled');
    $('#disconnect-button').attr('disabled', '');
    $('#shkaf-indication').addClass('red');
    $('#generator-indication').addClass('red');
    $('#shkaf-indication').removeClass('green accent-3');
    $('#generator-indication').removeClass('green accent-3');
    $('#switch-voltage').attr('disabled', '');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-voltage').prop('checked', false);
    $('#switch-frequency').prop('checked', false);
    $('#range-voltage').val(0);
    $('#range-voltage').attr('disabled', '');
    $('#input-voltage').val(0);
    $('#input-voltage').attr('disabled', '');
    $('#set_voltage').attr('disabled', '');
    $('#checkbox-turn-on').attr('disabled', '');
    $('#checkbox-turn-off').attr('disabled', '');
    $('#start-timer').attr('disabled', '');
    $('#stop-timer').attr('disabled', '');
    $('#checkbox-turn-on').prop('checked', false);
    $('#checkbox-turn-off').prop('checked', false);

    $('#hours-on').attr('disabled', '');
    $('#minutes-on').attr('disabled', '');
    $('#seconds-on').attr('disabled', '');

    $('#hours-off').attr('disabled', '');
    $('#minutes-off').attr('disabled', '');
    $('#seconds-off').attr('disabled', '');

    $('#start-timer').attr('disabled', '');
    $('#switch-chart').attr('disabled');

    Swal.fire({
      title: 'Error',
      icon: 'error',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }

  function success() {
    $('#connect-button').attr('disabled', '');
    $('#disconnect-button').removeAttr('disabled');
    $('#shkaf-indication').addClass('green accent-3');
    $('#generator-indication').addClass('green accent-3');
    $('#shkaf-indication').removeClass('red');
    $('#generator-indication').removeClass('red');
    $('#switch-voltage').removeAttr('disabled');
    $('#switch-frequency').removeAttr('disabled');
    $('#input-voltage').val(0);
    $('#input-frequency').val(1);
    $('#generator-card').html('Generator is connected');
    $('#vip-card').html('ВИП-40 is connected');

    $('#checkbox-turn-on').removeAttr('disabled');
    $('#checkbox-turn-off').removeAttr('disabled');

    $('#error-card').removeClass('red');
    $('#error-card').addClass('green accent-3');

    $('#start-timer').removeAttr('disabled');

    $('#range-voltage').removeAttr('disabled');
    $('#input-voltage').removeAttr('disabled');
    $('#set_voltage').removeAttr('disabled');

    $('#range-frequency').removeAttr('disabled');
    $('#input-frequency').removeAttr('disabled');
    $('#set_frequency').removeAttr('disabled');
    $('#switch-chart').removeAttr('disabled');

    Swal.fire({
      title: 'Device has been success connected',
      icon: 'success',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }

  await connect(nodevice, error, success);
});

//disconnect button
$('#disconnect-button').click(() => {
  function foo() {
    $('#connect-button').removeAttr('disabled');
    $('#disconnect-button').attr('disabled', '');
    $('#shkaf-indication').addClass('red');
    $('#generator-indication').addClass('red');
    $('#shkaf-indication').removeClass('green accent-3');
    $('#generator-indication').removeClass('green accent-3');
    $('#switch-voltage').attr('disabled', '');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-voltage').prop('checked', false);
    $('#switch-frequency').prop('checked', false);
    $('#range-voltage').val(0);
    $('#range-voltage').attr('disabled', '');
    $('#input-voltage').val(0);
    $('#input-voltage').attr('disabled', '');
    $('#set_voltage').attr('disabled', '');

    $('#range-frequency').val(0);
    $('#range-frequency').attr('disabled', '');
    $('#input-frequency').val(0);
    $('#input-frequency').attr('disabled', '');
    $('#frequency').attr('disabled', '');

    $('#generator-card').html('Generator is disconnected');
    $('#vip-card').html('ВИП-40 is disconnected');

    $('#checkbox-turn-on').attr('disabled', '');
    $('#checkbox-turn-off').attr('disabled', '');
    $('#checkbox-turn-on').prop('checked', false);
    $('#checkbox-turn-off').prop('checked', false);

    $('#start-timer').attr('disabled', '');
    $('#stop-timer').attr('disabled', '');

    $('#hours-on').attr('disabled', '');
    $('#minutes-on').attr('disabled', '');
    $('#seconds-on').attr('disabled', '');

    $('#hours-off').attr('disabled', '');
    $('#minutes-off').attr('disabled', '');
    $('#seconds-off').attr('disabled', '');

    $('#error-card').removeClass('green accent-3');
    $('#error-card').addClass('red');

    $('#start-timer').attr('disabled', '');
    $('#switch-chart').attr('disabled');

    Swal.fire({
      title: 'Device has been success disconnected',
      icon: 'success',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }
  disconnect(foo);
});

//set voltage button
$('#set_voltage').click(() => {
  globalVoltage = $('#input-voltage').val() * 10;
  $('#set_voltage').attr('disabled', '');
});

//set frequency button
$('#set_frequency').click(() => {
  localFrequency = $('#input-frequency').val();
  localStateGenerator = 1;
  $('#set_frequency').attr('disabled', '');
});

//enable-disable voltage set button
$('#input-voltage').change(() => {
  if($('#input-voltage').val() != localVoltage) {
    $('#set_voltage').removeAttr('disabled');
  }
  else {
    $('#set_voltage').attr('disabled', '');
  }
});

$('#range-voltage').change(() => {
  if($('#input-voltage').val() != localVoltage) {
    $('#set_voltage').removeAttr('disabled');
  }
  else {
    $('#set_voltage').attr('disabled', '');
  }
});

//enable-disable frequency set button
$('#input-frequency').change(() => {
  if($('#input-frequency').val() != localFrequency) {
    $('#set_frequency').removeAttr('disabled');
  }
  else {
    $('#set_frequency').attr('disabled', '');
  }
});

$('#range-frequency').change(() => {
  if($('#input-frequency').val() != localFrequency) {
    $('#set_frequency').removeAttr('disabled');
  }
  else {
    $('#set_frequency').attr('disabled', '');
  }
});

//chart options
$('#dots').change(() => {
  dotCount = +($('#dots').val());
});

$('#average-chart').change(() => {
  averageDots = +($('#average-chart').val());
});

//enable-disable timers
$('#checkbox-turn-off').change(() => {
  if($('#checkbox-turn-off').prop('checked') || $('#checkbox-turn-on').prop('checked')) {
    $('#start-timer').removeAttr('disabled');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-frequency').prop('checked', false);
    globalStateGenerator = 0;
  }
  else {
    $('#start-timer').attr('disabled', '');
    $('#switch-frequency').removeAttr('disabled');
    globalStateGenerator = 0;
  }
  if($('#checkbox-turn-off').prop('checked')) {
    //enable timer off
    $('#hours-off').removeAttr('disabled');
    $('#minutes-off').removeAttr('disabled');
    $('#seconds-off').removeAttr('disabled');
  }
  else {
    //disable timer off
    $('#hours-off').attr('disabled', '');
    $('#minutes-off').attr('disabled', '');
    $('#seconds-off').attr('disabled', '');
  }
});

$('#checkbox-turn-on').change(() => {
  if($('#checkbox-turn-off').prop('checked') || $('#checkbox-turn-on').prop('checked')) {
    $('#start-timer').removeAttr('disabled');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-frequency').prop('checked', false);
    globalStateGenerator = 0;
  }
  else {
    $('#start-timer').attr('disabled', '');
    $('#switch-frequency').removeAttr('disabled');
    globalStateGenerator = 0;
  }
  if($('#checkbox-turn-on').prop('checked')) {
    //enable timer on
    $('#hours-on').removeAttr('disabled');
    $('#minutes-on').removeAttr('disabled');
    $('#seconds-on').removeAttr('disabled');
  }
  else {
    //disable timer off
    $('#hours-on').attr('disabled', '');
    $('#minutes-on').attr('disabled', '');
    $('#seconds-on').attr('disabled', '');
  }
});

//timers
let timerOn;
let timerOff;

//start timers
$('#start-timer').click(() => {

  if($('#checkbox-turn-on').prop('checked')) {
    $('#checkbox-turn-on').attr('disabled', '');
  }

  if($('#checkbox-turn-off').prop('checked')) {
    $('#checkbox-turn-off').attr('disabled', '');
  }

  $('#start-timer').attr('disabled', '');
  $('#stop-timer').removeAttr('disabled');

  //on-timer
  if($('#checkbox-turn-on').prop('checked')) {
    let counter_1 = $('#seconds-on').val();
    let counter_2 = $('#minutes-on').val();
    let counter_3 = $('#hours-on').val();
    timerOn = setInterval(function () {
      $('#seconds-on').val(counter_1);
      $('#minutes-on').val(counter_2);
      $('#hours-on').val(counter_3);


      if(counter_1 == 0 && counter_2 > 0) {
        counter_1 = 59;
        --counter_2;
      }

      if(counter_2 == 0 && counter_3 > 0) {
        counter_1 = 59;
        counter_2 = 59;
        --counter_3;
      }

      if(counter_1 == 0) {
        //off-timer
        if($('#checkbox-turn-off').prop('checked')) {
          offTimer();
        }
        else {
          $('#checkbox-turn-on').removeAttr('disabled');
          $('#start-timer').removeAttr('disabled');
          $('#stop-timer').attr('disabled', '');
          $('#hours-on').removeAttr('disabled');
          $('#minutes-on').removeAttr('disabled');
          $('#seconds-on').removeAttr('disabled');
          $('#switch-frequency').removeAttr('disabled');
          //do something after timerOn will have run out
        }
        clearInterval(timerOn);
        //start
        $('#switch-frequency').prop('checked', true);
        globalStateGenerator = 1;
        Swal.fire({
          title: 'Start',
          icon: 'warning',
          toast: true,
          position: 'bottom-end',
          timer: 4000,
          showConfirmButton: false,
          background: '#c1f7f0'
        });
      }
      counter_1--;
    }, 10);
  }

  if($('#checkbox-turn-off').prop('checked') && !$('#checkbox-turn-on').prop('checked')) {
    offTimer();

    Swal.fire({
      title: 'Start',
      icon: 'warning',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }

  function offTimer() {
    let counter_4 = $('#seconds-off').val();
    let counter_5 = $('#minutes-off').val();
    let counter_6 = $('#hours-off').val();

    timerOff = setInterval(function () {
      $('#seconds-off').val(counter_4);
      $('#minutes-off').val(counter_5);
      $('#hours-off').val(counter_6);

      if(counter_4 == 0 && counter_5 > 0) {
        counter_4 = 59;
        --counter_5;
      }

      if(counter_5 == 0 && counter_6 > 0) {
        counter_4 = 59;
        counter_5 = 59;
        --counter_6;
      }

      if(counter_4 == 0) {
        clearInterval(timerOff);
        //do something
        //stop
        globalReset();

        if($('#checkbox-turn-on').prop('checked')) {
          $('#hours-on').removeAttr('disabled');
          $('#minutes-on').removeAttr('disabled');
          $('#seconds-on').removeAttr('disabled');
          $('#checkbox-turn-on').removeAttr('disabled');
        }

        if($('#checkbox-turn-off').prop('checked')) {
          $('#hours-off').removeAttr('disabled');
          $('#minutes-off').removeAttr('disabled');
          $('#seconds-off').removeAttr('disabled');
          $('#checkbox-turn-off').removeAttr('disabled');
        }

        $('#start-timer').removeAttr('disabled');
        $('#stop-timer').attr('disabled', '');

        Swal.fire({
          title: 'Stop',
          icon: 'warning',
          toast: true,
          position: 'bottom-end',
          timer: 4000,
          showConfirmButton: false,
          background: '#c1f7f0'
        });
      }
      counter_4--;
    }, 10);
  }

  $('#hours-on').attr('disabled', '');
  $('#minutes-on').attr('disabled', '');
  $('#seconds-on').attr('disabled', '');

  $('#hours-off').attr('disabled', '');
  $('#minutes-off').attr('disabled', '');
  $('#seconds-off').attr('disabled', '');
});

$('#stop-timer').click(() => {
  if($('#checkbox-turn-on').prop('checked')) {
    $('#checkbox-turn-on').removeAttr('disabled');
  }

  if($('#checkbox-turn-off').prop('checked')) {
    $('#checkbox-turn-off').removeAttr('disabled');
  }

  clearInterval(timerOn);
  clearInterval(timerOff);
  $('#start-timer').removeAttr('disabled');
  $('#stop-timer').attr('disabled', '');

  if($('#checkbox-turn-on').prop('checked')) {
    $('#hours-on').removeAttr('disabled');
    $('#minutes-on').removeAttr('disabled');
    $('#seconds-on').removeAttr('disabled');
  }

  if($('#checkbox-turn-off').prop('checked')) {
    $('#hours-off').removeAttr('disabled');
    $('#minutes-off').removeAttr('disabled');
    $('#seconds-off').removeAttr('disabled');
  }
});

//switch Chart
$('#switch-chart').click(() => {
  if($('#switch-chart').prop('checked')) {
    globalChartState = true;
  }
  else {
    globalChartState = false;
  }
});

ipcRender.on('close-app', (event, data) => {
  Swal.fire({
    title: 'Вы действительно хотите выйти?',
    icon: 'question',
    confirmButtonText: 'Cool',
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'да',
    cancelButtonText: 'нет',
    focusConfirm: false,
    focusCancel: true,
    onClose: closeCancel,
    preConfirm: closeConfirm
  });

  function closeCancel() {
    ipcRender.send('no-close');
  }

  function closeConfirm() {
    ipcRender.send('close-app');
  }
});

//update global variables
function globalFromLocal() {
  globalFrequency = localFrequency;
  globalStateGenerator = localStateGenerator;
  globalVoltage = localVoltage;
  globalStateVoltage = localStateVoltage;
}

//reset global variables
function globalReset() {
  globalFrequency = 1;
  globalStateGenerator = 0;
  globalVoltage = 0;
  globalStateVoltage = 0;
}
