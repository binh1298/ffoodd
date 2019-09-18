const jwt = require('jsonwebtoken');
const status = require('http-status');
const { to } = require('await-to-js');

module.exports = ({ logger }) => {
  logger.info('Wiring authentication middlewares');

  const requireAuth = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'This site require authorization'
      });
    }

    if (token.startsWith('Bearer '))
      token = token.slice(7);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if (err)
        return res.status(status.UNAUTHORIZED).send({
          success: false,
          message: 'Token invalid',
        });

      req.user = decodedPayload;
      next();
    });
  };

  return {
    requireAuth
  }
}
