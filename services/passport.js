const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log("serializeUser:"+user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log("deserializeUser"+id+"...user:"+JSON.stringify(user))
    done(null, user);
  });
});
passport.use(new GoogleStrategy(    {
      clientID:     keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      //proxy: true
    },
    (accessToken,refreshToken,profile,done) =>
     {
       User.findOne({ googleId: profile.id }).then(existingUser => {
         if (existingUser) {
           // we already have a record with the given profile ID
           console.log("Existing User:",existingUser.googleId);
           done(null, existingUser);
         } else {
           // we don't have a user record with this ID, make a new record!
           new User({ googleId: profile.id })
             .save()
             .then(user => {console.log("New User Saved:",user.googleId); done(null, user) });
         }
       })}
 ));
