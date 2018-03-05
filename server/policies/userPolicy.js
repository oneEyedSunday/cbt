const jwt = require('jsonwebtoken');
const CONFIG = require('../config/');
const User = require('../models/User');


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
