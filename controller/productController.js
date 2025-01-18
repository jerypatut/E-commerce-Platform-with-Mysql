const Products = require('../models/products');
const upload = require('../utils/multer');

// Render halaman produk
exports.renderProducts = async (req, res) => {
  try {
    const cookie = req.session.isLoggedIn;
    const [rows] = await Products.fetchProducts();
    res.render('home', { products: rows, isLoggedIn: cookie });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Render halaman tambah produk
exports.renderAddProduct = (req, res) => {
  res.render('add-product', { isLoggedIn: req.session.isLoggedIn });
};

// Tambah produk baru
exports.postAddProduct = (req, res) => {
  upload.single('img')(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .render('error', { message: 'Error uploading file' });

    try {
      const { productname, price, dekskripsi } = req.body;
      const img = req.file ? req.file.filename : null;
      const product = new Products(null, productname, price, img, dekskripsi);
      await product.postData();
      res.redirect('/');
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).render('error', { message: 'Error adding product' });
    }
  });
};

// Render halaman edit produk
exports.renderEditProduct = async (req, res) => {
  try {
    const cookie = req.session.isLoggedIn;
    const productId = req.params.id;
    const [productData] = await Products.fetchProductById(productId);
    if (!productData.length) {
      return res.status(404).render('error', { message: 'Product not found' });
    }
    res.render('edit-product', { product: productData[0], isLoggedIn: cookie });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).render('error', { message: 'Error fetching product data' });
  }
};

// Edit produk
exports.editProduct = (req, res) => {
  upload.single('img')(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .render('error', { message: 'Error uploading file' });

    try {
      const { productname, price, dekskripsi } = req.body;
      const id = req.params.id;
      const img = req.file ? req.file.filename : null;

      // Mengambil data produk lama
      const [product] = await Products.fetchProductById(id);
      if (!product.length) {
        return res
          .status(404)
          .render('error', { message: 'Product not found' });
      }

      const oldImg = product[0].img;
      const imageToUse = img || oldImg;

      // Update data produk
      const updatedProduct = new Products(
        id,
        productname,
        price,
        imageToUse,
        dekskripsi,
      );
      await updatedProduct.editData();
      res.redirect('/');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).render('error', { message: 'Error updating product' });
    }
  });
};

// Hapus produk
exports.deleteProduct = async (req, res) => {
  try {
    await Products.deleteProductById(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).render('error', { message: 'Error deleting product' });
  }
};
