const requestMiddleware = require('./request.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = Object.create({
	initialize: async () => ({
    requestMiddleware,
    authMiddleware
  })
});
