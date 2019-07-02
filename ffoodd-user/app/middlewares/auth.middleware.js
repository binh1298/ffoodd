const jwt = require('jsonwebtoken');
const status = require('http-status');
const { to } = require('await-to-js');

module.exports = ({ logger, accountService: Account }) => {
  logger.info('Wiring authentication middlewares');

  const requireAuthEmail = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'This site require authorization'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err0, decodedPayload) => {
      if (err0)
        return res.status(status.UNAUTHORIZED).send({
          success: false,
          message: 'Token invalid',
        });
      
      const [ err1, account ] = await to(Account.findById({ id: decodedPayload._id }));
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
    })
  };

  const requireAuth = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        success: false,
        message: 'This site require authorization'
      });
    }

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

  const requireRole = roles => async (req, res, next) => {
    const [ err, accountRoles ] = await to(Account.findRolesById(req.user._id));
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
