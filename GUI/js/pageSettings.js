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
  }
  else {
    globalStateGenerator = 1;
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
    $('#switch-chart').attr('disabled', '');

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
    $('#switch-voltage').removeAttr('disabled');
    $('#switch-frequency').removeAttr('disabled');
    $('#input-voltage').val(0);
    $('#input-frequency').val(1);

    $('#checkbox-turn-on').removeAttr('disabled');
    $('#checkbox-turn-off').removeAttr('disabled');

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
    $('#switch-chart').attr('disabled', '');

    $('#error-text').html('No connection');

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
  globalFrequency = $('#input-frequency').val();
  globalStateGenerator = 1;
  $('#set_frequency').attr('disabled', '');
});

//enable-disable voltage set button
$('#input-voltage').change(() => {
  if($('#input-voltage').val() != globalVoltage) {
    $('#set_voltage').removeAttr('disabled');
  }
  else {
    $('#set_voltage').attr('disabled', '');
  }
});

$('#range-voltage').change(() => {
  if($('#input-voltage').val() != globalVoltage) {
    $('#set_voltage').removeAttr('disabled');
  }
  else {
    $('#set_voltage').attr('disabled', '');
  }
});

//enable-disable frequency set button
$('#input-frequency').change(() => {
  if($('#input-frequency').val() != globalFrequency) {
    $('#set_frequency').removeAttr('disabled');
  }
  else {
    $('#set_frequency').attr('disabled', '');
  }
});

$('#range-frequency').change(() => {
  if($('#input-frequency').val() != globalFrequency) {
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
  }
  else {
    $('#start-timer').attr('disabled', '');
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
  }
  else {
    $('#start-timer').attr('disabled', '');
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

  //two timers
  if($('#checkbox-turn-on').prop('checked') && $('#checkbox-turn-off').prop('checked')) {

    if((+$('#seconds-on').val() != 0 || (+$('#minutes-on').val() != 0) || (+$('#hours-on').val() != 0)) && (+$('#seconds-off').val() != 0 || (+$('#minutes-off').val() != 0) || (+$('#hours-off').val() != 0))) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');

      //disable input
      $('#hours-on').attr('disabled', '');
      $('#minutes-on').attr('disabled', '');
      $('#seconds-on').attr('disabled', '');

      $('#hours-off').attr('disabled', '');
      $('#minutes-off').attr('disabled', '');
      $('#seconds-off').attr('disabled', '');


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
          offTimer();
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
    else {
      Swal.fire({
        title: 'Timer is set to zero',
        icon: 'error',
        toast: true,
        position: 'bottom-end',
        timer: 3000,
        showConfirmButton: false,
        background: '#c1f7f0'
      });
    }
  }
  //only on
  else if($('#checkbox-turn-on').prop('checked') && !$('#checkbox-turn-off').prop('checked')) {

    if(+$('#seconds-on').val() != 0 || (+$('#minutes-on').val() != 0) || (+$('#hours-on').val() != 0)) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');

      //disable input
      $('#hours-on').attr('disabled', '');
      $('#minutes-on').attr('disabled', '');
      $('#seconds-on').attr('disabled', '');

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
          //offTimer();
          clearInterval(timerOn);
          //start
          $('#switch-frequency').prop('checked', true);
          globalStateGenerator = 1;

          $('#checkbox-turn-on').removeAttr('disabled');
          $('#checkbox-turn-off').removeAttr('disabled');
          $('#stop-timer').attr('disabled', '');

          $('#hours-on').removeAttr('disabled');
          $('#minutes-on').removeAttr('disabled');
          $('#seconds-on').removeAttr('disabled');

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
    else {
      Swal.fire({
        title: 'Timer is set to zero',
        icon: 'error',
        toast: true,
        position: 'bottom-end',
        timer: 3000,
        showConfirmButton: false,
        background: '#c1f7f0'
      });
    }
  }
  //only off
  else if(!$('#checkbox-turn-on').prop('checked') && $('#checkbox-turn-off').prop('checked')) {

    if(+$('#seconds-off').val() != 0 || (+$('#minutes-off').val() != 0) || (+$('#hours-off').val() != 0)) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');

      //disable input
      $('#hours-off').attr('disabled', '');
      $('#minutes-off').attr('disabled', '');
      $('#seconds-off').attr('disabled', '');


      offTimer();
    }
    else {
      Swal.fire({
        title: 'Timer is set to zero',
        icon: 'error',
        toast: true,
        position: 'bottom-end',
        timer: 3000,
        showConfirmButton: false,
        background: '#c1f7f0'
      });
    }
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
        //stop
        globalStateGenerator = 0;
        $('#switch-frequency').prop('checked', false);

        $('#hours-on').removeAttr('disabled');
        $('#minutes-on').removeAttr('disabled');
        $('#seconds-on').removeAttr('disabled');
        $('#checkbox-turn-on').removeAttr('disabled');

        $('#hours-off').removeAttr('disabled');
        $('#minutes-off').removeAttr('disabled');
        $('#seconds-off').removeAttr('disabled');
        $('#checkbox-turn-off').removeAttr('disabled');

        $('#start-timer').removeAttr('disabled');
        $('#stop-timer').attr('disabled', '');

        $('#hours-off').removeAttr('disabled');
        $('#minutes-off').removeAttr('disabled');
        $('#seconds-off').removeAttr('disabled');


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
});

$('#stop-timer').click(() => {
  clearInterval(timerOn);
  clearInterval(timerOff);

  $('#checkbox-turn-on').removeAttr('disabled');
  $('#checkbox-turn-off').removeAttr('disabled');


  $('#start-timer').removeAttr('disabled');
  $('#stop-timer').attr('disabled', '');

  $('#hours-on').removeAttr('disabled');
  $('#minutes-on').removeAttr('disabled');
  $('#seconds-on').removeAttr('disabled');

  $('#hours-off').removeAttr('disabled');
  $('#minutes-off').removeAttr('disabled');
  $('#seconds-off').removeAttr('disabled');
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
