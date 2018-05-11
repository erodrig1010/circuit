const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const User           = require("../models/user");
const Exercise       = require("../models/exercise");
const Circuit        = require("../models/circuit");


// Gets all the exercises from the database and renders the create page
router.get('/select-exercises', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Exercise.find({}, (err, oneExercise) => {    
    if (err) {
      return next(err);
    }
    res.render(`circuit/select-exercises`, { user: req.user, exercise: oneExercise })
  })
})


router.post(`/create`, (req, res, next) => {
  console.log("THIS IS REQ.BODY=========================> ", req.body)
  const exercises = req.body.exercises.map((oneExercise) => {
    return {id: oneExercise, reps: 0, weight: 0}
  });
  const newCircuit = new Circuit({
    exercises: exercises
  })

  newCircuit.save()
  .then((newCircuit) => {
    console.log("THIS IS newCircuit=========================> ",newCircuit)
    const myExercises = []
    newCircuit.exercises.forEach(function(exercise) {
      Exercise.findById(exercise.id)
      .then((theExercise) => {
        myExercises.push(theExercise)
        console.log(theExercise)
        console.log(myExercises)
        if(myExercises.length === newCircuit.exercises.length) {
          res.render('circuit/create', {excercises: myExercises, circuit: newCircuit, user: req.user})
        }
      })
    })
  })  
  .catch((err) => {
    console.log(err)
  })
})

 
router.post('/finish-create/:id', (req, res, next) => {
  const exercisesArray = []
  console.log("=========================>the second route")
  const circuitId = req.params.id;
  Circuit.findById(circuitId)
  .then(theCircuit => {
    console.log("THIS IS theCircuit=========================>", theCircuit)
    theCircuit.name = req.body.nameOfCircuit;
    theCircuit.sets = req.body.numberOfSets;
    theCircuit.rest = req.body.restTime;
    theCircuit.exercises = theCircuit.exercises;
    theCircuit.createdby = req.user._id;
    theCircuit.exercises.forEach(function(oneExercise, index){
      oneExercise.reps = req.body.exerciseReps[index];
      oneExercise.weight = req.body.exerciseWeight[index];
      Exercise.findById(oneExercise.id)
      .then(theExercise => {
        exercisesArray.push(theExercise)
        if(exercisesArray.length === theCircuit.exercises.length) {
          theCircuit.save()
          .then((theNewCircuit) => {
          })
          .catch(err => {
            console.log("Exercise save error: ", err)
          })
          res.redirect("/circuit/user/" + req.user._id)
        }
      })
    })
   
  })
  .catch(err => {
    console.log("Circuit save error: ", err)
  })
})

router.get("/user/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Circuit.find({createdby: req.user._id}, (err, myCircuits) => {
    if (err) { return next(err); }
    res.render('user/dashboard', { circuits: myCircuits, user: req.user });
  });
});

router.post("/delete/:id", (req, res, next) => {
  const circuitId = req.params.id
  const theCircuit = Circuit.findByIdAndRemove(circuitId)
  .then((circuit) => {
    console.log("THIS GOT DELETED================> ", circuit)
  })
  .catch((err) => {
    console.log(err);
  })
  res.redirect("/circuit/user/" + req.user._id)
})


router.get('/:id', (req, res) => {
  const circuitId = req.params.id;
  const exercisesArray = [];
  Circuit.findById(circuitId)
    .then((circuit) => {
      circuit.exercises.forEach((oneExercise) => {
        Exercise.findById(oneExercise.id)
        .then((theExercise) => {
          exercisesArray.push(theExercise)
          if(exercisesArray.length === circuit.exercises.length) {
            res.render('circuit/preview', {circuit: circuit, user: req.user, exercises: exercisesArray})
            console.log("There is an error:", err);
          }
        })
      })
    })
  });






module.exports = router;