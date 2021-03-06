require('dotenv').config();

const bodyParser       = require('body-parser');
const cookieParser     = require('cookie-parser');
const express          = require('express');
const favicon          = require('serve-favicon');
const hbs              = require('hbs');
const mongoose         = require('mongoose');
const logger           = require('morgan');
const path             = require('path');
const Schema           = mongoose.Schema;
const session          = require("express-session");
const MongoStore       = require("connect-mongo")(session);
const bcrypt           = require("bcrypt");
const passport         = require("passport");
const LocalStrategy    = require("passport-local").Strategy;
const flash            = require("connect-flash");

// Require Models
const User             = require("./models/user");
const Exercise         = require("./models/exercise");
const Circuit          = require("./models/circuit");


mongoose.Promise = Promise;
mongoose
// process.env.MONGODB_URI
// "mongodb://localhost/circuit"
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());


// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(passport.initialize());
app.use(passport.session());



// default value for title local
app.locals.title = 'Circuit';



//Passport Strategy
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true 
}, (req, username, password, next) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "No accounts exist with that email." });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "That password is incorrect. Try again." });
    }

    return next(null, user);
  });
}));



// Routes
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require("./routes/auth-routes");
app.use('/', authRoutes);

const circuitRoutes = require("./routes/circuit-routes");
app.use(`/circuit`, circuitRoutes);

const userRoutes = require("./routes/user-routes");
app.use(`/user`, userRoutes);


module.exports = app;
