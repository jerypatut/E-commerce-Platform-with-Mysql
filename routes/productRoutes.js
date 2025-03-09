const express = require('express');
const router = express.Router();

const {
  renderProducts,
  renderAddProduct,
  renderEditProduct,
  renderPostProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/productController');
const { auth } = require('../middlewares/auth');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());
router.get('/', auth, renderProducts);
router.get('/add-product', renderAddProduct);
router.post('/add-product', auth, renderPostProduct);
router.get('/edit-product/:id', renderEditProduct);
router.post('/edit-product/:id', auth, updateProduct);
router.get('/delete-product/:id', auth, deleteProduct);
module.exports = router;
