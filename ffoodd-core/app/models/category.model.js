const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Category', CategorySchema);