'use strict';

//materialize init
(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $(".dropdown-trigger").dropdown();
    $('select').formSelect();

    M.Collapsible.init($('.collapsible'), {
      accordion: false,
      inDuration: 500,
      outDuration: 500
    });

     M.Tooltip.init($('.tooltipped'), {
       position: 'bottom'
     });

     $('.dropdown-trigger').dropdown();

     $('#side-close').click(() => {
       $('.sidenav').sidenav('close');
     });

  });
})(jQuery);

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
      title: lang.alert.nodevice,
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
    $('#vip-card').addClass('red');
    $('#generator-card').addClass('red');
    $('#vip-card').removeClass('green');
    $('#generator-card').removeClass('green');
    $('#switch-voltage').attr('disabled', '');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-voltage').prop('checked', false);
    $('#switch-frequency').prop('checked', false);
    $('#range-voltage').val(0);
    $('#range-voltage').attr('disabled', '');
    $('#input-voltage').val(0);
    $('#input-voltage').attr('disabled', '');
    $('#set_voltage').attr('disabled', '');
    $('#set_frequency').attr('disabled', '');
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

    $('#switch-chart').attr('disabled', '');

    Swal.fire({
      title: lang.alert.errorTitle,
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

    $('#range-voltage').removeAttr('disabled');
    $('#input-voltage').removeAttr('disabled');
    $('#set_voltage').removeAttr('disabled');

    $('#range-frequency').removeAttr('disabled');
    $('#input-frequency').removeAttr('disabled');
    $('#set_frequency').removeAttr('disabled');
    $('#switch-chart').removeAttr('disabled');

    $('#clear-chart').removeAttr('disabled');


    Swal.fire({
      title: lang.alert.successConnection,
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
    $('#vip-card').addClass('red');
    $('#generator-card').addClass('red');
    $('#vip-card').removeClass('green');
    $('#generator-card').removeClass('green');
    $('#switch-voltage').attr('disabled', '');
    $('#switch-frequency').attr('disabled', '');
    $('#switch-voltage').prop('checked', false);
    $('#switch-frequency').prop('checked', false);
    $('#range-voltage').val(0);
    $('#range-voltage').attr('disabled', '');
    $('#input-voltage').val(0);
    $('#input-voltage').attr('disabled', '');
    $('#set_voltage').attr('disabled', '');

    $('#set_frequency').attr('disabled', '');
    $('#range-frequency').val(0);
    $('#range-frequency').attr('disabled', '');
    $('#input-frequency').val(0);
    $('#input-frequency').attr('disabled', '');
    $('#frequency').attr('disabled', '');

    $('#generator-card').html(lang.page.generatorDisconnect);
    $('#vip-card').html(lang.page.vipDisconnect);

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

    $('#error-text').removeClass('green');
    $('#error-text').addClass('red');

    $('#switch-chart').attr('disabled', '');

    $('#error-text').html(lang.page.errors.NC);

    $('#real-voltage').html(0 + ` ${lang.page.measures.voltage}`);
    $('#current').html(0 + ` ${lang.page.measures.current}`);

    Swal.fire({
      title: lang.alert.successDisonnection,
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

//delay function
function delay(ms) {
  return new Promise(ok => {
    setTimeout(ok, ms);
  });
}

//set voltage button
$('#set_voltage').click(async () => {
  if($('#input-voltage').val() >= 0 && $('#input-voltage').val() <= 40) {
    $('#set_voltage').attr('disabled', '');

    if(Math.abs($('#input-voltage').val() * 10 - globalVoltage) < 10) {
      globalVoltage = $('#input-voltage').val() * 10;
    }
    else {
      const difference = $('#input-voltage').val() * 10 - globalVoltage;

      console.log(difference);
      if(difference > 0) {
        const count = Math.floor(difference/voltageStep);
        const reminder = difference%voltageStep;
        for(let i = 0; i < count; i++) {
          globalVoltage += voltageStep;
          console.log(globalVoltage);
          await delay(500);
        }
        globalVoltage += reminder;
        console.log(globalVoltage);
      }
      else {
        const count =  Math.floor(-difference/voltageStep);
        const reminder = (-difference)%voltageStep;
        for(let i = 0; i < count; i++) {
          globalVoltage -= voltageStep;
          console.log(globalVoltage);
          await delay(500);
        }
        globalVoltage -= reminder;
        console.log(globalVoltage);
      }
    }
  }
  else {
    Swal.fire({
      title: lang.alert.wrongVoltage,
      icon: 'error',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }
});

//set frequency button
$('#set_frequency').click(() => {
  if( $('#input-frequency').val() >=0 &&  $('#input-frequency').val() <= 200) {
    globalFrequency = $('#input-frequency').val();
    $('#set_frequency').attr('disabled', '');
  }
  else {
    Swal.fire({
      title: lang.alert.wrongFrequency,
      icon: 'error',
      toast: true,
      position: 'bottom-end',
      timer: 4000,
      showConfirmButton: false,
      background: '#c1f7f0'
    });
  }
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

//point count
$('#dots').change(() => {
  dotCount = +($('#dots').val());
});

//average
$('#average-chart').change(() => {
  averageDots = +($('#average-chart').val());
});

//axis step
$('#chart-step').change(() => {
  const newStep = +($('#chart-step').val());
  updateChartStep(myChart, newStep);
});

//clear chart
$('#clear-chart').click(() => {
  clearChart(myChart);
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
  //positivi timer
  let isPositive = false;


  //two timers
  if($('#checkbox-turn-on').prop('checked') && $('#checkbox-turn-off').prop('checked')) {

    if((+$('#seconds-on').val() >= 0) && (+$('#minutes-on').val() >= 0) && (+$('#hours-on').val() >= 0) && (+$('#seconds-off').val() >= 0) && (+$('#minutes-off').val() >= 0) && (+$('#hours-off').val() >= 0)) {
      isPositive = true;
    }
    else {
      isPositive = false;
    }

    if((+$('#seconds-on').val() != 0 || (+$('#minutes-on').val() != 0) || (+$('#hours-on').val() != 0)) && (+$('#seconds-off').val() != 0 || (+$('#minutes-off').val() != 0) || (+$('#hours-off').val() != 0)) && isPositive) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');
      $('#start-timer').attr('disabled', '');

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

        if(counter_1 <= 0) {
          offTimer();
          clearInterval(timerOn);
          $('#seconds-on').val(0);
          $('#minutes-on').val(0);
          $('#hours-on').val(0);
          //start
          $('#switch-frequency').prop('checked', true);
          globalStateGenerator = 1;
          Swal.fire({
            title: lang.alert.startTimer,
            icon: 'warning',
            toast: true,
            position: 'bottom-end',
            timer: 4000,
            showConfirmButton: false,
            background: '#c1f7f0'
          });
        }
        counter_1--;
      }, 1000);

    }
    else {
      Swal.fire({
        title: lang.alert.errorTimer,
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

    if((+$('#seconds-on').val() >= 0) && (+$('#minutes-on').val() >= 0) && (+$('#hours-on').val() >= 0)) {
      isPositive = true;
    }
    else {
      isPositive = false;
    }

    if((+$('#seconds-on').val() != 0 || (+$('#minutes-on').val() != 0) || (+$('#hours-on').val() != 0)) && isPositive) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');
      $('#start-timer').attr('disabled', '');


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

        if(counter_1 <= 0) {
          $('#seconds-on').val(0);
          $('#minutes-on').val(0);
          $('#hours-on').val(0);

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

          $('#start-timer').removeAttr('disabled');

          Swal.fire({
            title: lang.alert.startTimer,
            icon: 'warning',
            toast: true,
            position: 'bottom-end',
            timer: 4000,
            showConfirmButton: false,
            background: '#c1f7f0'
          });
        }
        counter_1--;
      }, 1000);

    }
    else {
      Swal.fire({
        title: lang.alert.errorTimer,
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

    if((+$('#seconds-off').val() >= 0) && (+$('#minutes-off').val() >= 0) && (+$('#hours-off').val() >= 0)) {
      isPositive = true;
    }
    else {
      isPositive = false;
    }

    if((+$('#seconds-off').val() != 0 || (+$('#minutes-off').val() != 0) || (+$('#hours-off').val() != 0)) && isPositive) {
      //disable checkbox
      $('#checkbox-turn-on').attr('disabled', '');
      $('#checkbox-turn-off').attr('disabled', '');
      $('#stop-timer').removeAttr('disabled');
      $('#start-timer').attr('disabled', '');

      //disable input
      $('#hours-off').attr('disabled', '');
      $('#minutes-off').attr('disabled', '');
      $('#seconds-off').attr('disabled', '');

      offTimer();
    }
    else {
      Swal.fire({
        title: lang.alert.errorTimer,
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

      if(counter_4 <= 0) {
        clearInterval(timerOff);
        $('#seconds-off').val(0);
        $('#minutes-off').val(0);
        $('#hours-off').val(0);
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
          title: lang.alert.stopTimer,
          icon: 'warning',
          toast: true,
          position: 'bottom-end',
          timer: 4000,
          showConfirmButton: false,
          background: '#c1f7f0'
        });
      }
      counter_4--;
    }, 1000);
  }
});

$('#stop-timer').click(() => {
  clearInterval(timerOn);
  clearInterval(timerOff);

  $('#checkbox-turn-on').removeAttr('disabled');
  $('#checkbox-turn-off').removeAttr('disabled');


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

//install driver
$('#install-driver').click(() => {
  ipcRender.send('install-driver');
  console.log('install');
});

//open docs
$('#open-docs').click(() => {
  ipcRender.send('open-docs');
});

//change lang
$('#change-lang').change(() => {
  ipcRender.send('changeLang', $('#change-lang').val());
});

//close app
$('#close-app').click(() => {
  ipcRender.send('close-app');
});

ipcRender.on('close-app', (event, data) => {
  Swal.fire({
    title: lang.alert.exitQuestion,
    icon: 'question',
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: lang.alert.confirmExit,
    cancelButtonText: lang.alert.dismissExit,
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
