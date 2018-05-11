$(document).ready(function() {
  


  $('.numberOfExercises').html($('.selected').length);

  $(function(){
    $('.exerciseContainer').click(function() {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $('.numberOfExercises').html($('.selected').length);
      }
      else {
        $(this).addClass("selected");
        $('.numberOfExercises').html($('.selected').length);
      }
    });
  });
  
  var ids = [];
  $('#nextButton').click(function() {
    $('.selected').each(function() {
        ids.push($(this).find('input').val());
        console.log("THIS IS THE IDS ARRAY #1=========================> ", ids);
    });
    ids.forEach(function(id) {
      $("#selectExercisesForm").append(`<input type="hidden" value="${id}" name="exercises">`)
    })
    $("#selectExercisesForm").submit()
  })


  // $('#deleteButton').click(function() {
  //   const circuitId = $('.circuitId').val()
  //   console.log(circuitId)
  //   if(!circuitId){ 
  //     return 
  //   }
  //   axios.post(`/circuit/delete/${circuitId}`)
  //   .then(response => {
  //     console.log("Circuit deleted successfully!", response)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // })


});