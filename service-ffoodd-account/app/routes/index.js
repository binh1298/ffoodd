const accountRoute = require('./account.route');
const rootRoute = require('./root.route');

module.exports = Object.create({
  initialize: async () => ({
    accountRoute,
    rootRoute
  })
})
