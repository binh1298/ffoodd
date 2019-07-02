const { logger } = require('../../config/');

const createRoute = (...handlers) => {
  for (let i = 0; i < handlers.length; i ++) {
    if(typeof(handlers[i]) !== 'function')
      return logger.error(`CREATE_ROUTE expect function but got ${typeof(handlers[i])}`);
  }

  const routeState = {
    isNext: true,
    error: null
  };

  const resetState = () => {
    routeState.isNext = true,
    routeState.error = null
  }

  const next = err => {
    if (err) {
      return routeState.error = err;
    }

    routeState.isNext = true
  };

  const handleError = (call, callback) => {
    logger.error(`Something when wrong :{} ${routeState.error.stack}`);
    callback({ message: 'Something when wrong :{}' }, null);
  }

  return (call, callback) => {
    for (let i = 0; i < handlers.length; i++) {
      if (routeState.error) {
        handleError(call, callback);
        break;
      }

      if (!routeState.isNext)
        break;

      routeState.isNext = false;

      handlers[i](call, callback, next);
    }

    resetState();
  }
}

module.exports = createRoute;
