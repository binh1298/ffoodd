const rootRoute = require('./root.route');

module.exports = Object.create({
  gatherDependencies: async () => ({
    rootRoute
  })
});
