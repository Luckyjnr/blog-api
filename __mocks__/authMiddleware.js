// This mock will be used in tests instead of the real middleware
module.exports.protect = (req, res, next) => {
  req.user = { _id: '507f1f77bcf86cd799439011', role: 'user' }; // fake user
  next();
};

module.exports.isOwnerOrAdmin = () => true; // always allow for tests
