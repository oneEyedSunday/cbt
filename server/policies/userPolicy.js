const jwt = require('jsonwebtoken');
const CONFIG = require('../config/');
const User = require('../models/User');
const validator = require('validator');


exports.isAuth = function(req,res, next){
  let bearerToken;
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined'){
    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[2];

    if(bearer[0] !== 'Bearer'){
      return res.status(500).send({message:"bearer not understood"});
    }

    // verify if this token was from us or not
    jwt.verify(bearerToken, CONFIG.jwt.secret, function(err,decoded){
      if (err) {
        console.error("verification error", err);
        if(err.name === "TokenExpiredError"){
          return res.status(401).send({message:"Session timed out, please login again"});
        }
        else {
          return res.status(500).send({message:"Error authenticating, please login again", err: err.message, tok: bearerToken});
        }
      }
      User.findById(decoded._id).then(user => {
        if (!user) return res.status(403).send({message: "User not found"})
        req.user = user
        next()
      }).catch(err => res.status(500).send({message: err}))
    });
  } else {
    return res.status(401).send({message:"No token provided"});
  }
};

exports.createMiddleware = function(req, res, next){
  // validate email
  if (validator.isEmpty(req.body.email)) {
    return res.status(403).send({
      error: 'Email field cannot be empty'
    })
  }

  if (!validator.isEmail(req.body.email)){
    return res.status(403).send({
      error: "Email isn't valid"
    })
  }

  if (!validator.isAlpha(req.body.firstname)) {

  }

  if (!validator.isAlpha(req.body.middlename)) {

  }
  if (!validator.isAlpha(req.body.lastname)){}


  // password length validations
  // validator.isLength('string',{min:, max:})

  // array vlidators is not empty for roles and subjects

  // roles validtion validator,isIn(req.body.roles[x],
  //   ['ADMIN', 'SUBJECT TEACHER'])
  // sanitize
  // normalize ROLES
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_lowercase: true
  })

  next()

}

exports.findMiddleware = function(req, res, next){
  if (!validator.isMongoId(req.params.id)) {
    return res.status(400).send({
      error: "Id isn't a valid MongoDB Object Id"
    })
  }
  next()
}

exports.loginMiddleware = function(req, res, next){
  // email and password exist
}
