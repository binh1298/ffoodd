const status = require('http-status');
const { to } = require('await-to-js');

module.exports = container => {
  const { Account } = container.resolve('repos');

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

  return Object.create({
    getProfile
  });
}
