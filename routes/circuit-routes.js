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


// router.get('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   res.render(`circuit/create`, { user: req.user})
// })


router.post(`/create`, (req, res, next) => {
  console.log("THIS IS REQ.BODY=========================> ", req.body)
  const exercises = req.body.exercises;
  const newCircuit = new Circuit({
    exercises: exercises
  })

  newCircuit.save()
  .then((newCircuit) => {
    console.log("THIS IS newCircuit=========================> ",newCircuit)
    const myExercises = []
    newCircuit.exercises.forEach(function(exercise) {
      Exercise.findById(exercise)
      .then((theExercise) => {
        myExercises.push(theExercise)
        console.log(theExercise)
      })
      console.log(myExercises)
      res.render('circuit/create', {excercises: myExercises, circuit: newCircuit, user: req.user})
    })
  })  
  .catch((err) => {
    console.log(err)
  })
})

 
router.post('/finish-create/:id', (req, res, next) => {
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
    theCircuit.save();
    theCircuit.exercises.forEach(function(oneId){
      Exercise.findById(oneId)
      .then(theExercise => {
        theExercise.reps = req.body.exerciseReps;
        theExercise.weight = req.body.exerciseWeight;
        theExercise.save()
        console.log("THIS IS theCircuit again=========================>", theCircuit)
        console.log("THIS IS theExercise=========================>", theExercise)
        res.redirect(`/user/{{req.user._id}}`)
      })
      .catch(err => {
        console.log("Exercise save error: ", err)
      })
    })
  })
  .catch(err => {
    console.log("Circuit save error: ", err)
  })
})

router.get(`/user/{{req.user._id}}`, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Circuit.find({createdby: req.user._id}, (err, myCircuits) => {
    if (err) { return next(err); }
    res.render('user/dashboard', { circuits: myCircuits });
  });
});

module.exports = router;