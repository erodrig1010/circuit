const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const User           = require("../models/user");
const Exercise       = require("../models/exercise");
const Circuit        = require("../models/circuit");


// Gets all the exercises from the database and renders the create page
router.get('/:id', ensureLogin.ensureLoggedIn(),(req,res,next)=>{
  const id = req.params.id;
  res.render(`user/dashboard`, { user: req.user})
})



module.exports = router;