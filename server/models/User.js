const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const CONFIG = require('../config/');

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    },
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    default: ["SUBJECT_TEACHER"]
  },
  // array of ObjectIDs of subjects
  subjects: {
    type: Array,
    required: false
  }
});

// virtuals and methods

// fullname
userSchema.virtual("fullname").get(function(){
  return this.firstname + " " + (this.middlename || "") + " " + this.lastname;
});
// subject(s)

// don't need this, mongoose removes the password nayway
// toJSON
userSchema.methods.toJSON =  function toJSON(cb){
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.getToken = function(req, res){
    let token = jwt.sign(this.toJSON(), CONFIG.jwt.secret, {
      expiresIn: '10m'
    })
    return token;
};

// beforeCreate
userSchema.methods.beforeCreate =  function(values, cb){
  bcrypt.hash(values, 10, function(err,hash){
    if (err) return cb(err);
    // values.password = hash;
    // cb();
    return hash;
  });
};

userSchema.pre("save", function(next){
  let user = this;
  if(!user.isModified("password")) return next();
  bcrypt.genSalt(10, function(err,salt){
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
// other roles include admin

userSchema.path("email").validate(function(value, done){
  mongoose.model("User", userSchema).count({email: value}, function(err,count){
    if (err) return done(err);
    done(!count);
  });
}, "Email already exists");

module.exports = mongoose.model('User', userSchema);
