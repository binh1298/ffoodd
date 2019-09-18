const authController = require('./auth.controller');
const accountController = require('./account.controller');

module.exports = Object.create({
  initialize: async () => ({
    authController,
    accountController,
  })
});
