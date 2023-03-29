'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const { ObjectID } = require('mongodb');
const app = express();

// Setup pug view engine
app.set('view engine', 'pug');
app.set('views', './views/pug');

// Check .env files

// Setting up passport
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : true,
  saveUninitialized : true,
  cookie : { secure : false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize and Deserialize
// passport.serializeUser(cb);
// passport.deserializeUser(cb);

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.route('/').get((req, res) => {
  res.render('index', { title : 'Hello', message : 'Please Log in '})

});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  // myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, null);
  // });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
