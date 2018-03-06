const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
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

exports.create = async (req, res) => {
  let err, existingUser, user;
  [err, existingUser] = await to(User.findOne({email: req.body.email.normalize()}))
  if (err) return res.status(500).send({ error: err.message })
  if (existingUser) return res.status(403).send({ error: 'Credentials in use, this email address is taken' })



  let candidate = {
    firstname: 'Godson',
    lastname: 'El Rey',
    email: 'telmozarra@gmail.com',
    password: 'zaza'
  }

  // const cu = new User(candidate)

  // cu.save().then(c => res.status(200).send({
  //   user: c.toJSON(),
  //   token: c.getToken()
  // })).catch(err => res.status(500).send({error: err.errmsg}))
  [err, user] = await to(User.create({
    firstname: 'Godson',
    lastname: 'El Rey',
    email: 'telmozarra@gmail.com',
    password: 'zaza'
  }))

  if (err) return res.status(500).send({error: err})
  console.log(user)
  return res.status(200).send({
    message : 'ok',
    user: user
    // user: user.toJSON(),
    // token: user.getToken()
  })

  // return res.send(candidate.password)
  // .then(c => res.status(200).send({c: c})).catch(err => res.status(500).send(err))
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

exports.login = async function(req,res){
  // User.findOne({
  //   email: req.body.email
  // }).then(user => {
  //   if (!user) return res.status(403).send({message:"User not found, please sign up."});
  //   bcrypt.compare(req.body.password, user.password, function(err,matched){
  //       if (err) return res.status(500).send({message: err.message});
  //       if(!matched) return res.status(403).send({mesage:"Incorrect password"});
  //
  //       // return token
  //       return res.status(200).send({
  //         user: user.toJSON(),
  //         token: user.getToken()
  //       });
  //     });
  // })
  // .catch(err => res.status(500).send({message: err.message}))

  let err, user;
  [err, user] = await to(User.findOne({ email: req.body.email.normalize() }))
  // if (err) TE(err.message)
  if (err) return res.status(422).send({error: err.message})


  // if (!user) TE('Not registered')
  if (!user) {
    return res.status(422).send({error: 'Not registered'})
  } else {
  [err, user] = await to(user.comparePassword(req.body.password))
  // if (err) TE(err.message)
  if (err) return res.status(422).send({error: err.message})
  // return user;
  return res.status(200).send({
    token: user.getToken(),
    user: user.toJSON()
  })
}
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
