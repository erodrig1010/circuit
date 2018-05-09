$(document).ready(function() {
  



  
  $(function(){
    $('.exerciseContainer').click(function() {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
      }
      else {
        $(this).addClass("selected");
      }
    });
  });
  
  var ids = [];
  $('#nextButton').click(function() {
    $('.selected').each(function() {
        ids.push($(this).find('input').val());
        console.log(ids);
    });
  })





});