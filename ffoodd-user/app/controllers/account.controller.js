const status = require('http-status');
const { to } = require('await-to-js');

module.exports = container => {
  const Account = {};

  const getProfile = async (req, res, next) => {
    const [ err, account ] = await to(Account.findById(req.user.id));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Get profile',
        profile: account
      });
  }

  const putProfile = async (req, res, next) => {
    const { firstname, lastname } = req.body;
    const [ err ] = await to(Account.update({ firstname, lastname }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Update profile'
      });
  }

  const patchPassword = async (req, res, next) => {
    const { password } = req.body;
    const [ err ] = await to(Account.updatePassword({ password }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Update password'
      });
  }

  const patchEmail = async (req, res, next) => {
    const { email } = req.body;
    const [ err ] = await to(Account.updateEmail({ email }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Update email'
      });
  }

  return Object.create({
    getProfile,
    putProfile,
    patchPassword,
    patchEmail
  });
}
