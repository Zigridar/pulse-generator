'use strict'

const electron = require('electron');
const ipcRender = electron.ipcRenderer;

//connect button
$('#set_voltage').click(() => {
  //ipcRender.send('close-app');
});

//disconnect button
$('#set_frequency').click(() => {

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
