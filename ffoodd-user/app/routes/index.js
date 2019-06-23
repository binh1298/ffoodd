const rootRoute = require('./root.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');

module.exports = Object.create({
  initialize: async () => ({
    rootRoute,
    accountRoute,
    authRoute
  })
});
