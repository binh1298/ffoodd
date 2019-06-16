const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  }, 
  password: {
    type: String,
    required: true,
    trim: true, 
    minlength: 6,
  }, 
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean, 
  },
  firstname: {
    type: String, 
    trim: true,
    required: true
  },
  lastname:{
    type: String, 
    trim: true, 
    required: true
  }, 
  roles: [{
    type: String,
    enum: ['user', 'admin']
  }],
  verifyEmailKey: {
    type: String, 
    minlength: 6,
    maxlength: 6
  },
  verifyEmailKeyExpDate: {
    type: String
  }, 
  resetPassword: {
    type: Boolean
  }, 
  meal_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal"
  }]
})

module.exports = mongoose.model('Account', AccountSchema);