const status = require('http-status');
const { to } = require('await-to-js');

module.exports = ({ accountGRPCClientService, logger }) => {
  const Account = accountGRPCClientService.account;
  
  const getProfile = async (req, res, next) => {
    const [ err, response ] = await to(Account.findById({ _id: req.user._id }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Get profile',
        profile: response.account
      });
  }

  const putProfile = async (req, res, next) => {
    const { firstname, lastname } = req.body;
    const [ err ] = await to(Account.update({ _id: req.user._id, firstname, lastname }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Update profile'
      });
  }

  const patchPassword = async (req, res, next) => {
    const { password } = req.body;
    const [ err ] = await to(Account.updatePasswordById({ _id: req.user._id, password }));
    if (err) return next(err);

    res.status(status.OK)
      .send({
        success: true,
        message: 'Update password'
      });
  }

  const patchEmail = async (req, res, next) => {
    const { email } = req.body;
    const [ err ] = await to(Account.updateEmailById({ _id: req.user._id, email }));
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
