const emailRoute = require('./email.route');
const rootRoute = require('./root.route');

module.exports = Object.create({
  initialize: async () => ({
    emailRoute,
    rootRoute
  })
})
