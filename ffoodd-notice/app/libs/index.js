const createRoute = require('./create-route');
const email = require('./email');

module.exports = Object.create({
  initialize: async () => ({
    createRoute,
    email
  })
})
