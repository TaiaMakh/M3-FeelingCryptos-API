const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.model');

// Bcrypt config to encrypt passwords
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const { isLoggedOut, isLoggedIn } = require('../middlewares');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if(password.length < 6){
    return res.status(400).json({ message: 'Please make your password at least 6 characters long'});
  }

  if(!username || !email){
    return res.status(400).json({ message: 'Please fill all the fields in the form'});
  }

  User.findOne({ email })
  .then(user => {
    if(user){
      return res.status(400).json({ message: 'User already exists. Please change your email'});
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      username, 
      email, 
      password: hashPass
    })
    .then((newUser) => {
      // Passport req.login permite iniciar sesión tras crear el usuario
      req.login(newUser, (error) => {
        if(error){
          return res.status(500).json(error)
        }

        return res.status(200).json(newUser);
      })
    })
    .catch(error => res.status(500).json(error))
  })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, theUser, failureDetails) => {
    if(error){
      return res.status(500).json(error);
    }

    if(!theUser){
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (error) => {
      if(error){
        return res.status(500).json(error);
      }

      return res.status(200).json(theUser);
    })

  })(req, res, next)
})

router.post('/logout', isLoggedIn, (req, res, next) => {
  // req.logout is defined by passport
  req.logout();
  return res.status(200).json({ message: 'Log out success!'});
})

router.put('/edit', isLoggedIn, uploader.single('photo'), (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user.id }, { ...req.body, photo: req.file ? req.file.path : req.user.photo }, { new: true })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json(error))
})

router.get('/profile', (req, res, next) => {
  // req.isAuthenticated & req.user are defined by passport
  if(req.isAuthenticated()){
    return res.status(200).json(req.user);
  } else {
    //todo why this?
    return res.status(307).json({ message: "User isn't logged in. Redirect" });
  }
})

router.post('/delete', (req, res, next) =>{
  User.findByIdAndRemove(req.user.id)
  .then(() => res.status(200).json({message: 'User removed'}))
  .catch(error => res.status(500).json(error))
})

// Social auth routes
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.status(200).json(req.user);
});

module.exports = router;