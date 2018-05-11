const express        = require("express");
const router         = express.Router();
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");

// User model
const User           = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;



// router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

router.get("/signup", (req, res, next) => {
  res.render("passport/signup")
});

router.post("/signup", (req, res, next) => {
  console.log(req);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (firstname === "" && lastname === "" && email === "" && password === "") {
    res.render("passport/signup", { message: "Name, email, and password are all required." });
    return;
  }

  if (firstname === "" || lastname === "") {
    res.render("passport/signup", { message: "Please enter your first and last name too." });
    return;
  }

  if (email === "" || password === "") {
    res.render("passport/signup", { message: "You need a valid email and password to sign up." });
    return;
  }


  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("passport/signup", { message: "There is already an account using that email. Try logging in." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPass,
    });
    newUser.save((err) => {
      if (err) {
        res.render("passport/signup", { message: "Something went wrong. Try again." });
      } else {
        res.redirect("/login");
      }
    });
  });
});


router.get("/login", (req, res, next) => {
  res.render("passport/login", { "message": req.flash("error") });
});

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/circuit/user/" + req.user._id,
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

router.post("/login", passport.authenticate("local", {
  successRedirect: "/circuit/user/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
router.get("/circuit/user", (req,res,next) => {
  res.redirect('/circuit/user/'+req.user._id)
});

router.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("success", "You have successfully logged out. See you soon!");
  res.redirect("/login");
});



module.exports = router;