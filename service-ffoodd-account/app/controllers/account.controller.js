const Account = require('../repositories/account.repository');

const create = async (call, callback, next) => {
  const account = await Account.create(call.request);

  callback(null, { message: 'CREATE_ACCOUNT', account });
}

module.exports = {
  create
}
