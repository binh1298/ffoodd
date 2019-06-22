const requestMiddleware = require('./request.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = Object.create({
	initialize: async container => {
    return {
      requestMiddleware: requestMiddleware(container),
      authMiddleware: authMiddleware(container)
    }    
	}
});
