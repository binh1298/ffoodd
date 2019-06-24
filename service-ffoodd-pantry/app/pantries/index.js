module.exports = Object.create({
  initialize: async () => ({

  })
})
const themealdb = require('./themealbd/');

module.exports = Object.create({
  initialize: async () => ({
    ...themealdb
  })
})
