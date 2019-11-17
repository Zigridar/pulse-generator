'use strict'

const electron = require('electron');
const ipcRender = electron.ipcRenderer;

// setInterval(function () {
//   console.log($('#range-voltage-extend > .thumb > .value').html());
//   console.log($('#range-frequency-extend > .thumb > .value').html());
// }, 1000);

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
    $('#range-voltage').attr('disabled', '');
    $('#input-voltage').attr('disabled', '');
    $('#set_voltage').attr('disabled', '')
  }
  else {
    $('#range-voltage').removeAttr('disabled');
    $('#input-voltage').removeAttr('disabled');
    $('#set_voltage').removeAttr('disabled');
  }
});


//toggle switch frequency
$('#switch-frequency').click(() => {
  if(!$('#switch-frequency').prop('checked')) {
    $('#range-frequency').attr('disabled', '');
    $('#input-frequency').attr('disabled', '');
    $('#set_frequency').attr('disabled', '')
  }
  else {
    $('#range-frequency').removeAttr('disabled');
    $('#input-frequency').removeAttr('disabled');
    $('#set_frequency').removeAttr('disabled');
  }
});

//connect button
$('#connect-button').click(async () => {
  function error() {
    $('#connect-button').removeAttr('disabled');
    $('#disconnect-button').attr('disabled', '');
  }
  function success() {
    $('#connect-button').attr('disabled', '');
    $('#disconnect-button').removeAttr('disabled');
    $('#shkaf-indication').addClass('teal accent-3');
    $('#generator-indication').addClass('teal accent-3');
    $('#shkaf-indication').removeClass('red');
    $('#generator-indication').removeClass('red');
    $('#switch-voltage').removeAttr('disabled');
    $('#switch-frequency').removeAttr('disabled');
  }

  await connect(error, success);
});
//disconnect button
$('#disconnect-button').click(() => {
  function foo() {
    $('#connect-button').removeAttr('disabled');
    $('#disconnect-button').attr('disabled', '');
    $('#shkaf-indication').addClass('red');
    $('#generator-indication').addClass('red');
    $('#shkaf-indication').removeClass('teal accent-3');
    $('#generator-indication').removeClass('teal accent-3');
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
  }
  disconnect(foo);
});




$('#set_voltage').click(() => {

});

$('#set_frequency').click(() => {

});

$('#shkaf-indication').click(() => {

});

$('#generator-indication').click(() => {

});

$('#error-text').click(() => {

});

$('#real-voltage').click(() => {

});

$('#current').click(() => {

});

$('#vacuum-gauge-value').click(() => {

});


ipcRender.on('close-app', (event, data) => {
  Swal.fire({
    title: 'Вы действительно хотите выйти?',
    icon: 'question',
    confirmButtonText: 'Cool',
    // toast: true,
    // position: 'top-end',
    // timer: 3000,
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
