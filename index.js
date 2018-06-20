const express = require('express');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI);
const User = mongoose.model('users');

function resolveAfter1() {
  return new Promise(resolve => {
    var cursor = User.find({fbId:{"$exists":true}}).cursor();
    cursor.on('data',(doc)=>{console.log("FB user record:"+JSON.stringify(doc)) } );
    cursor.on('close',(closed) => {resolve("End of FB user records"); } )
  });
}
function resolveAfter2() {
  return new Promise(resolve => {
    var cursor = User.find({googleId:{"$exists":true}}).cursor();
    cursor.on('data',(doc)=>{console.log("Google user record:"+JSON.stringify(doc)) } );
    cursor.on('close',(closed) => {resolve("End of Google user records"); } )
  });
}

async function asyncCall() {
  var result = await resolveAfter1();
  console.log(result);
  var result = await resolveAfter2();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
