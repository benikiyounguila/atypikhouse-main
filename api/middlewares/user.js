const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Vérifie si l'utilisateur est connecté
exports.isLoggedIn = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token =
    req.cookies.token ||
    (authHeader ? authHeader.replace('Bearer ', '') : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Login first to access this page',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token: ', decoded);
    req.user = await User.findById(decoded.id);
    console.log('Authenticated user: ', req.user);
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

// Vérifie si l'utilisateur connecté est admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
};

// Vérifie si l'utilisateur connecté est soit admin soit modérateur
exports.isAdminOrModerator = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === 'admin' || req.user.role === 'modérateur')
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Accès refusé : Vous n'avez pas les autorisations nécessaires.",
    });
  }
};
