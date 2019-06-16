const create = (call, callback, next) => {
  callback(null, { message: 'CREATE_ACCOUNT', account: call.request });
}

module.exports = {
  create
}
