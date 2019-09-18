const requestMiddleware = require('./request.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = Object.create({
	gatherDependencies: async () => ({
    requestMiddleware,
    authMiddleware
  })
});
