const jwt = require('jsonwebtoken')
const User = require('../model')

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '') || '';
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id)
    if (user) req.user = user;
    next();
  } catch (error) {
    res.sendStatus(400)
  }
}