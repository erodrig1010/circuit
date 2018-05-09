$(document).ready(function() {

  $(function(){
    $('.exerciseContainer').each(function(){
      $('.exerciseContainer').click(function() {
        if ($(this).hasClass("selected")) {
          $(this).removeClass("selected");
        }
        else {
          $(this).addClass("selected");
        }
      });
    });
  });

  function getSelected() {
    var ids = [];
    $('.selected').each(function () {
        var id = $(this).attr('id');
        if (id) {
            ids.push($(this).attr('id'));
        }
    });
    return ids;
    console.log(ids);
}






});