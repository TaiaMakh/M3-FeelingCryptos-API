const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

  app.use(passport.initialize());
  app.use(passport.session());

}