const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  // account_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Account'
  // },
  rating: {
    type: Number,
    min: 0,
    max: 4
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = ReviewSchema;
