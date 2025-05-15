const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function getUserFromSession(req) {
  try {
    const token = req.cookies.token; // à adapter selon ton cookie réel
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();
    return user ? { id: user._id, email: user.email, role: user.role } : null;
  } catch (err) {
    console.error('Erreur getUserFromSession', err);
    return null;
  }
}

module.exports = { getUserFromSession };
