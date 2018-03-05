const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/');
// change thus to jwtkeys

// use bcrypt_mode for async bcryptjs
// provided you can use native Promise


exports.index = (req,res) => {
  let users = new Promise((resolve,reject)=>{
    resolve(User.find());
  });

  users.then((results)=>res.send(results))
  .catch(err => res.status(500).send({message: err.message}));
};

exports.create = (req, res) => {
    User.findOne({
      email: req.body.email
    }).then(existingUser => {
      if (existingUser) return res.status(409).send({
        message: 'This email is already in use.'
      })

      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        subjects: req.body.subjects
      })
      // user.create
      user.save().then(u => {
        return res.status(200).send({
          user: u,
          token: u.getToken()
        })
      })
      .catch(err => res.status(500).send({message: err.message}))
    }).catch(err => res.status(500).send({message: err.message}))
};

exports.find = (req, res) => {
  // validate params
  if (req.params.id == null || req.params.id == undefined){
    return res.status(500).send({
      message: 'Please provide an ID'
    })
  }
  User.findById(req.params.id)
  .then(user => {
    if (!user) return res.status(400).send({message: 'User not found'});
    return res.send(user.toJSON());
  })
  .catch(err => res.status(500).send({message: err.message}))
};

exports.login = function(req,res){
  if(!req.body.email || !req.body.password) return res.status(500).send({message:"Fill all required information"});

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) return res.status(403).send({message:"User not found, please sign up."});
    bcrypt.compare(req.body.password, user.password, function(err,matched){
        if (err) return res.status(500).send({message: err.message});
        if(!matched) return res.status(403).send({mesage:"Incorrect password"});

        // return token
        return res.status(200).send({
          user: user.toJSON(),
          token: user.getToken()
        });
      });
  })
  .catch(err => res.status(500).send({message: err.message}))
}

exports.logout = function(req, res){
  // if i'm using req.user
  delete req.user;
  res.status(200).send("Successfully logged out");
}

// apply isAuth MIDDLEWARE
exports.token = function(req, res){
  // can also just pass it from middleware directly
  // passing req.user from middleware
  // console.log(fromMiddleWare)
  return res.json(req.user.getToken())
};
