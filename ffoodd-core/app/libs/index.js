const createRoute = require('./create-route');

module.exports = Object.create({
  gatherDependencies: async () => ({
    createRoute
  })
});
