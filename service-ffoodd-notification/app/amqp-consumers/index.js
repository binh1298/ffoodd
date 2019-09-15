const accountConsumer = require('./account.consumer');

module.exports = Object.create({
  initialize: async () => ({
      accountConsumer
  })
});
