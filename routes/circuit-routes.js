const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const User           = require("../models/user");
const Exercise       = require("../models/exercise");
const Circuit        = require("../models/circuit");


// Gets all the exercises from the database and renders the create page
router.get('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  // console.log(req)
  //console.log( Exercise)
  Exercise.find({}, (err, oneExercise) => {    
    if (err) {
      return next(err);
    }
    res.render(`circuit/create`, { user: req.user, exercise: oneExercise })
  })
})



module.exports = router;