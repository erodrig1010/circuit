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
        console.log(ids)
    });
    ids.forEach(function(id) {
      $("#selectExercisesForm").append(`<input type="hidden" value="${id}" name="exercises">`)
    })
    $("#selectExercisesForm").submit()
    // return ids
  })

  console.log(ids);

  $('#new-circuit-form').submit(function(event) {
    event.preventDefault();
    const circuitInfo = {};
      circuitInfo.exercises = {}
      circuitInfo.reps = $('.exerciseReps').val();
      circuitInfo.weight = $('.exerciseWeight').val();
      circuitInfo.sets = $('.numberOfSets').val();
      circuitInfo.rest = $('.restTime').val();

    // circuit info become req.body in the .js
    axios.post(`/circuit/create`, circuitInfo)
    .then(response => {
      console.log("Circuit created successfully!", response)
    })
    .catch(err => {
      console.log(err)
    })
    ids = []
  })



});