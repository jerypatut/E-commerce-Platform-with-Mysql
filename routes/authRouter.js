const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  registerAddUsers,
  registerGetUsers,
  loginAddUsers,
  loginGetUsers,
  Logout,
} = require('../controller/usersController');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded());
router.get('/sign-up', registerGetUsers);
router.post('/sign-up', registerAddUsers);
router.get('/login', loginGetUsers);
router.post('/login', loginAddUsers);
router.get('/logout', auth, Logout);
module.exports = router;
