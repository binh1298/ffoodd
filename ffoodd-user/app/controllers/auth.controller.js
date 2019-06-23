'use strict';

const bcrypt = require('bcrypt');
const { to } = require('await-to-js');
const jwt = require('jsonwebtoken');
const status = require('http-status');

module.exports = container => {
  const { Account } = container.resolve('services');

  const postSignIn = async (req, res, next) => {
    const { username, password } = req.body;
  
    const [ err0, account ] = await to(Account.findByUsername(username));
    if (err0) return next(err);

    if (!account)
      return res.status(status.OK)
        .send({
          success: false,
          message: 'Login failed',
          errors: {
              account: 'Account doesn\'t exist!'
          },
          token: null
        });

    const [ err1, result ] = await bcrypt.compare(password, account.password);
    if (err1) return next(err1);

    if (!result)
      return res.status(status.OK)
        .send({
          success: false,
          message: 'Login failed',
          errors: {
            password: 'password incorrect'
          },
          token: null
        });

    res.status(status.OK)
      .send({
        success: true,
        message: 'Login successfully',
        error: null,
        token: generateJWT(account)
      });
  }

  const postSignUp = async (req, res, next) => {
    const { username, password, email, firstname, lastname } = req.body;
    // if not taken
    const [ err, account ] = await to(Account.create({
      username, password, email, firstname, lastname
    }));
    if (err) return next(err);

    // sendEmail
    
    res.status(200).send({
      success: true,
      message: "Registered",
      token: generateJWT(account)
    });
  }

  const getVerifyEmail = async (req, res, next) => {
    const [ err, { email, verifyEmailKey } ] = await to(Account.newEmailVerifyKey({ id: req.user._id }));
    if (err) return next(err);

    // sendEmail

    res.status(200).send({
      success: true,
      message: 'Email verification has been sent'
    });
  }

  const patchVerifyEmail = async (req, res, next) => {
    const { key } = req.body;

    const [ err, result ] = await to(Account.verifyEmail({ id: req.user._id, key }));
    if (err) return next(err);

    // sendEmail
    
    res.status(200).send({
      success: true,
      message: 'Account has been verified'
    });
  }

  const getResetPassword = async (req, res) => {
    const { username } = req.params;

    const [ err, account ] = await to(Account.newEmailVerifyKey({ username }));
    if (err) return next(err);

    // sendEmail

    res.status(200).send({
      success: true,
      message: "Email reset password"
    });
  }

  const patchResetPassword = async (req, res, next) => {
    const { username } = req.params;
    const { key } = req.body;

    const [ err, result ] = await to(Account.resetPassword({ password, username, key }));
    if (err) return next(err);

    // sendEmail
    
    res.status(200).send({
      success: true,
      message: "Reset password"
    });
  }

  /**private */
  const generateJWT = ({ _id, username }) => {
    const payloadToken = { _id, username };

    return jwt.sign(payloadToken, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRES)
    });
  };

  return {
    postSignIn,
    postSignUp,
    getVerifyEmail,
    patchVerifyEmail,
    getResetPassword,
    patchResetPassword
  }
}
