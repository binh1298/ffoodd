const jwt = require('jsonwebtoken');
const status = require('http-status');
const { to } = require('await-to-js');

module.exports = ({ logger, accountService }) => {
  logger.info('Wiring authentication middlewares');

  const requireAuthEmail = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'This site require authorization'
      });
    }


    const [ err0, decodedPayload ] = await to(jwt.verify(token, process.env.JWT_SECRET));
    if (err0)
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'Token invalid',
      });
    
    const [ err1, account ] = await to(Account.findById(decodedPayload.id));
    if (err1) return next(err1);

    if (!account)
      return res.status(status.OK).send({
        success: false,
        message: 'Account does not exit'
      });

    if (!account.isVerified)
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        isVerified: false,
        message: 'Account has not been verified'
      });
    
    req.user = decodedPayload;
    next();

  };

  const requireAuth = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'This site require authorization'
      });
    }


    const [ err, decodedPayload ] = await to(jwt.verify(token, process.env.JWT_SECRET));
    if (err)
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'Token invalid',
      });
    
    req.user = decodedPayload;
    next();
  };

  const requireRole = roles => async (req, res, next) => {
    const [ err, accountRoles ] = await to(Account.getRolesById(req.user.id));
    if (err) return next(err);

    if (roles.some(role => accountRoles.includes(role)))
      return next();
    
    res.status(status.FORBIDDEN).send({
      success: false,
      message: 'Do not have permission to access this resource',
    });
  };
    
  return {
    requireAuth,
    requireAuthEmail,
    requireRole
  }
}
