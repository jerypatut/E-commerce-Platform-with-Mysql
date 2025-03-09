const express = require('express');
const router = express.Router();
router.get('/jeri', (req, res) => {
  const cookie = req.get('Cookie');
  console.log(cookie);
});
router.post('/', (req, res) => {
  res.cookie('isLoggedIn', 'true');
  res.send('Login oke');
});

module.exports = router;
