const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../utils/globals');
global.isLoggedIn = 'init';
exports.auth = (req, res, next) => {
  const token = req.session.token;
  if (req.path === '/logout') {
    global.isLoggedIn = 'init';
    return next(); // Gunakan return untuk menghentikan eksekusi lebih lanjut
  } else {
    try {
      const decodedToken = JWT.verify(token, tokenSignature);
      global.isLoggedIn = 'true';
      return next();
    } catch (err) {
      if (global.isLoggedIn === 'init') {
        return next();
      } else {
        global.isLoggedIn = 'false';
        return res.redirect('/login'); // Gunakan return agar eksekusi berhenti
      }
    }
  }
};
