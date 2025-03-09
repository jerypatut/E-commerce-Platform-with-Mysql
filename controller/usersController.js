const Users = require('../model/users');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { tokenSignature } = require('../utils/globals'); // Pastikan tokenSignature sudah didefinisikan

// Menampilkan halaman registrasi
const registerGetUsers = async (req, res) => {
  res.render('sign-up', {
    isLoggedIn: global.isLoggedIn,
  });
};

// Menangani registrasi pengguna
const registerAddUsers = async (req, res) => {
  try {
    const { userName, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password !== confirmPassword) {
      return res.status(400).send('Password not match');
    }
    const users = new Users(null, userName, hashedPassword);
    users.insertUser().then(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error('❌ Error inserting user:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Menampilkan halaman login
const loginGetUsers = async (req, res) => {
  res.render('login', {
    isLoggedIn: global.isLoggedIn,
  });
};

// Menangani proses login pengguna
const loginAddUsers = async (req, res) => {
  const { userName, password } = req.body;
  Users.fetchUsersbyUsername(userName).then(([[userCredentials], tinfo]) => {
    if (userCredentials) {
      const isMatch = bcrypt.compare(password, userCredentials.password);
      if (isMatch) {
        const token = JWT.sign(
          {
            userName,
          },
          tokenSignature, // Expire token in 1 hour
        );
        req.session.token = token;
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
};
const Logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = {
  registerGetUsers,
  registerAddUsers,
  loginGetUsers,
  loginAddUsers,
  Logout,
};
