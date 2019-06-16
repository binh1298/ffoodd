const requireAuth = (call, callback, next) => {
  next();
}

module.exports = {
  requireAuth
}
