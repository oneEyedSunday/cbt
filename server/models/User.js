const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const validator = require('validator');
const jwt = require("jsonwebtoken");


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
    type: String
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim:true,
    index: true,
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
  // blank role implies student,
  roles: [{
    type: String,
  }],
  // array of ObjectIDs of subjects
  // teacher potentially if students register
  // or make a new model for students and teachers
  // if role is ADMIN, just give all subjects
  subjects: [{
    type: Schema.ObjectId,
    ref: 'Subject'
  }]
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
      expiresIn: parseInt(CONFIG.jwt.expiration)
    })
    return token;
};

userSchema.pre("save", async function(next){
  if (this.isModified('password') || this.isNew) {
    let err, salt, hash;
    [ err,salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);
    [err, hash] = await to (bcrypt.hash(this.password, salt));
    if (err) TE(err.message, true);
    this.password = hash
  }
    return next();
});

userSchema.methods.comparePassword = async function(pw){
  let err, pass
  if (!this.password) TE('password not set');
  [err, pass] = await to(bcrypt_p.compare(pw, this.password));
  if (err) TE(err);
  // might want to make this ambiguous
  if (!pass) TE('invalid password');
  return this;
}
// other roles include admin

// remove this firts
/*
userSchema.path("email").validate(function(value, done){
  mongoose.model("User", userSchema).count({email: value}, function(err,count){
    if (err) return done(err);
    done(!count);
  });
}, "Email already exists");
*/

module.exports = mongoose.model('User', userSchema);
