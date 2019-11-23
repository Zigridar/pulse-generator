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

    // $('.tooltipped');
     M.Tooltip.init($('.tooltipped'), {
       position: 'bottom'
     });

     $('.dropdown-trigger').dropdown();

  }); // end of document ready
})(jQuery); // end of jQuery name space
