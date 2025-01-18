const express = require('express');
const { renderAddProduct, postAddProduct } = require('../controller/productController');
const router = express.Router();// Middleware built-in Express untuk parsing form-data

// Rute GET untuk menampilkan form tambah produk
router.get('/', renderAddProduct);

// Rute POST untuk menangani form submit
router.post('/', postAddProduct);


module.exports = router;
