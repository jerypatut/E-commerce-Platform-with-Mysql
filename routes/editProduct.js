const express = require('express');
const { renderEditProduct ,editProduct} = require('../controller/productController');
const router = express.Router();


router.get('/:id',renderEditProduct);

router.post('/:id',editProduct);

module.exports  = router;