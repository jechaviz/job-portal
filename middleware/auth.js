const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not Token
  if (!token) {
    return res.status(401).json({ msg: 'Sin token, Acceso denegado' });
  }

  // verify token

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // @ts-ignore
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token Inválido' });
  }
}