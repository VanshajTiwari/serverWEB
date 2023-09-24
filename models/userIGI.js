const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const crypto=require('crypto');
// const Player = require('../models/Player')

const userSchema = new mongoose.Schema({
  instution: {
    type: String,
    required: [true, 'Institution is required'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  pubId: {
    type: String,
    required: [true, 'Please enter a pubId'],
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password:{
    type:String,
    require:true
  }
});

userSchema.post('save', function (doc, next) {
  console.log('new user was created', doc);
  next();
})

userSchema.pre('save',async function (next) {
  const salt = await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  this.pubId = await bcrypt.hash(this.pubId, salt);
  // console.log('user about to created', this);
  next();
})

userSchema.statics.login = async function(email, pubId) {
  console.log("INSIDE SCHEMA");
   console.log(email,pubId);
   const user = await this.findOne({ email:email});
   if (user) {
     const auth = await bcrypt.compare(pubId, user.pubId);
     if (auth) {
       return user;
     }
     throw Error('incorrect pubId');
   }
   throw Error('incorrect email');

};

const User = mongoose.model('userIGI', userSchema);

module.exports = User;