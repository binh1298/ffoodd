const requestMiddleware = require('./request.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = Object.create({
	initialize: container => {
		return new Promise((resolve, reject) => {
			resolve({ 
				requestMiddleware: requestMiddleware(container),
				authMiddleware: authMiddleware(container)
			});	
		});
	}
});
