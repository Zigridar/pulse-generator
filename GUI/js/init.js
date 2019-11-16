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

  }); // end of document ready
})(jQuery); // end of jQuery name space
