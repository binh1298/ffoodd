const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  themealdb_id: {
    type: String
  },
  // owner_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Account'
  // },
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  origin: {
    type: String,
    trim: true
  },
  // category_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category'
  // },
  image: {
    type: String
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  recipe: {
    instruction: {
      type: String,
      trim: true
    },
    ingredients: [
      {
        name: {
          type: String,
          trim: true
        },
        measure: {
          type: String,
          trim: true
        }
      }
    ]
  }
});

module.exports = mongoose.model('Meal', MealSchema);
