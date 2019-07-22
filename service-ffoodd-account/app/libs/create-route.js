'user strict';

const createRoute = ({ logger }) => (...handlers) => {
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
    if (err)
      routeState.error = err;

    routeState.isNext = true;
  };

  const handleError = (call, callback) => {
    logger.error(`SERVICE_FFOODD_ACCOUNT Something when wrong :{} ${routeState.error.stack}`);
    callback({ message: 'SERVICE_FFOODD_ACCOUNT Something when wrong :{}' }, null);
  }

  return async (call, callback) => {
    for (let i = 0; i < handlers.length; i++) {
      if (!routeState.isNext)
        break;

      routeState.isNext = false;

      await handlers[i](call, callback, next);
    }

    if (routeState.error) {
      handleError(call, callback);
    }

    resetState();
  }
}

module.exports = createRoute;
