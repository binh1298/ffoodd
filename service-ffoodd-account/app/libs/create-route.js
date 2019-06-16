const createRoute = (...handlers) => {
  let isNext = false;
  const next = () => isNext = true;

  return (call, callback) => {
     for (let i = 0; i < handlers.length; i++) {
       isNext = false;
       handlers[i](call, callback, next);
     }
  }
}

module.exports = createRoute;
