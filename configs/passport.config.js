const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: TwitterStrategy } = require('passport-twitter');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  // Identificará a un usuario con una sesión (Asignará a la sesión el id del usuario)
  passport.serializeUser((user, cb) => { cb(null, user.id )});

  // Identificará a qué usuario pertenece la sesión
  passport.deserializeUser((id, cb) => {
    User.findById(id)
    .then(user => cb(null, user))
    .catch(error => cb(error))
  }); 

  // Local Strategy
  passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, (req, email, password, next) => {
    User.findOne({ email })
    .then(user => {
      if(!user){
        return next(null, false, { message: 'Usuario o contraseña incorrectos.'});
      }

      if(bcrypt.compareSync(password, user.password)){
        return next(null, user);
      } else {
        return next(null, false, { message: 'Usuario o contraseña incorrectos'});
      }
    }) 
    .catch((error) => next(error))
  }))

  // Twitter Strategy
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/api/auth/twitter/callback",
    includeEmail: true,
  },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        User.create({ 
          twitterId: profile._json.id_str,
          email: profile._json.email,
          username: profile._json.name,
          photo: profile._json.profile_image_url
        })
        .then(newUser => {
          done(null, newUser);
        })
        .catch(error => done(error))
      } else {
        done(null, currentUser);
      }
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

}