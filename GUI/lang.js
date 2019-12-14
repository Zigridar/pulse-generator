'use strict'
const electron = require('electron');
const ipcRender = electron.ipcRenderer;

let lang = {
      alert: {
        nodevice: 'There aren`t any available devices',
        errorTitle: 'Error',
        successConnection: 'Device has been success connected',
        successDisonnection: 'Device has been success disconnected',
        wrongVoltage: 'Wrong Voltage',
        wrongFrequency: 'Wrong Frequency',
        startTimer: 'Start',
        stopTimer: 'Stop',
        errorTimer: 'Timer is set to zero',
        exitQuestion: 'Do you really want to close app?',
        confirmExit: 'Yes',
        dismissExit: 'No',
        changeLang: 'Please, relaunch app to change language'
      },
      page: {
        vipConnect: 'ВИП-40 is connected',
        vipDisconnect: 'ВИП-40 is disconnected',
        generatorConnect: 'Generator is connected',
        generatorDisconnect: 'Generator is disconnected',
        vacuumGauge: 'Vacuum gauge',
        measures: {
          voltage: 'kV',
          current: 'mA',
          vacuum: 'Pa'
        },
        errors: {
          OK: 'No mistakes',
          SCR: 'Short resist circuit',
          NW: 'No water',
          OC: 'Overcurrent',
          SCB: 'Short circuit in box',
          BL: 'Lock',
          NC: 'No connection'
        }
      },
      chart: {
        pressure: 'Pressure'
      }
    }

ipcRender.on('lang', (e, language) => {
  console.log(language);
  if(language == 'rus') {
    lang = {
      alert: {
        nodevice: 'Нет устройств',
        errorTitle: 'Ошибка',
        successConnection: 'Устройство успешно подключено',
        successDisonnection: 'Устройство успешно отключено',
        wrongVoltage: 'Недопустимое напряжения',
        wrongFrequency: 'Недопустимая частота',
        startTimer: 'СТАРТ',
        stopTimer: 'СТОП',
        errorTimer: 'Недопустимое значение таймера',
        exitQuestion: 'Вы действительно хотите выйти',
        confirmExit: 'Да',
        dismissExit: 'Нет',
        changeLang: 'Пожалуйста, перезагрузите приложение чтобы изменить язык'
      },
      page: {
        vipConnect: 'ВИП-40 подключен',
        vipDisconnect: 'ВИП-40 не подключен',
        generatorConnect: 'ГИ подключен',
        generatorDisconnect: 'ГИ не подключен',
        vacuumGauge: 'Вакууметр',
        measures: {
          voltage: 'кВ',
          current: 'мА',
          vacuum: 'Па'
        },
        errors: {
          OK: 'Ошибок нет',
          SCR: 'КЗ в нагрузке',
          NW: 'Нет воды',
          OC: 'Перегрузка по току',
          SCB: 'КЗ в баке',
          BL: 'Блокировка',
          NC: 'Нет соединения'
        }
      },
      chart: {
        pressure: 'Давление'
      }
    }
  }
});
