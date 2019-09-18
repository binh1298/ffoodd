const rootRoute = require('./root.route');
const accountRoute = require('./account.route');

module.exports = Object.create({
  initialize: async () => ({
    rootRoute,
    accountRoute
  })
});
