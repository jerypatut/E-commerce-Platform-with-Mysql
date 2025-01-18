const express = require('express');
const { renderSignUp, registerUser,renderLogin, validateLogin,Logout } = require('../controller/userAuthController');
const router = express.Router();
const bodyParser = require('body-parser');
// Middleware untuk mem-parsing JSON request body


// Middleware untuk mem-parsing data form-urlencoded (seperti form HTML)
router.use(bodyParser.urlencoded());
// Rute untuk menampilkan form sign-up
router.get('/sign-up', renderSignUp);

// Rute untuk menangani data form sign-up
router.post('/sign-up', registerUser);

router.get('/login',renderLogin);


router.post('/login',validateLogin);

router.get ('/logout',Logout);

module.exports = router;
