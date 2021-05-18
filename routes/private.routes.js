const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { isLoggedOut, isLoggedIn } = require('../middlewares');

router.post('/', isLoggedIn, (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user.id },  { $addToSet: { favorites_cryptos: req.body.favorites_cryptos }}, {new: true}) 
    .then(user => {
        console.log(user)
        res.status(200).json(user)})
    .catch(error => res.status(500).json(error))
})
router.get('/favorites', isLoggedIn, (req, res, next) => {
    User.findById({_id: req.user.id})
    .then(user =>{
        console.log(user.favorites_cryptos)
        res.status(200).json(user.favorites_cryptos)
    })
})

module.exports = router;
