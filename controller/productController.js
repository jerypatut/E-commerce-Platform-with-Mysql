const Products = require('../model/products');
const upload = require('../utils/multer');

// ✅ Fetch semua produk dan render ke halaman home
const renderProducts = async (req, res) => {
  try {
    const products = await Products.fetchProducts();
    res.render('home', {
      products,
      isLoggedIn: global.isLoggedIn,
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};
// ✅ Render halaman tambah produk
const renderAddProduct = (req, res) => {
  res.render('add-product', {
    isLoggedIn: global.isLoggedIn,
  });
};

// ✅ Tambah produk baru
const renderPostProduct = async (req, res) => {
  upload.single('img')(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .render('error', { message: 'Error uploading file' });
    }
    try {
      const { productname, price, deskripsi } = req.body;
      const img = req.file ? req.file.filename : null;

      if (!productname || !price || !deskripsi || !img) {
        return res.status(400).send('❌ Semua field harus diisi!');
      }

      const product = new Products(null, productname, price, img, deskripsi);
      await product.postData();
      res.redirect('/');
    } catch (error) {
      console.error('❌ Error adding product:', error);
      res.status(500).send('Gagal menambahkan produk');
    }
  });
};
// ✅ Render halaman edit produk
const renderEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await Products.fetchProductById(productId);
    console.log('🛠 Debugging Product Data:', productData); // Debugging data

    if (!productData || productData.length === 0) {
      return res.status(404).send('Product not found');
    }

    res.render('edit-product', {
      product: productData,
      isLoggedIn: global.isLoggedIn,
    }); // FIXED: kirim langsung `productData`
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
};

// ✅ Update produk

const updateProduct = async (req, res) => {
  upload.single('img')(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .render('error', { message: 'Error uploading file' });
    }

    try {
      const { productname, price, deskripsi } = req.body;
      const id = req.params.id;
      if (!productname || !price || !deskripsi) {
        return res
          .status(400)
          .render('error', { message: 'Semua field harus diisi!' });
      }
      if (isNaN(price)) {
        return res
          .status(400)
          .render('error', { message: 'Harga harus berupa angka!' });
      }

      // Mengambil data produk lama
      const product = await Products.fetchProductById(id);
      if (!product) {
        return res
          .status(404)
          .render('error', { message: 'Product not found' });
      }

      const oldImg = product.img;
      const img = req.file ? req.file.filename : oldImg;

      // Update data produk menggunakan instance baru
      const updatedProduct = new Products(
        id,
        productname,
        price,
        img,
        deskripsi,
      );
      await updatedProduct.updateData();
      res.redirect('/');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).render('error', { message: 'Error updating product' });
    }
  });
};

// ✅ Hapus produk
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.deleteData(id);

    if (result.affectedRows === 0) {
      return res.status(404).send('❌ Produk tidak ditemukan');
    }

    console.log('✅ Produk berhasil dihapus!');
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).send('Gagal menghapus produk');
  }
};

module.exports = {
  renderProducts,
  renderAddProduct,
  renderPostProduct,
  renderEditProduct,
  updateProduct,
  deleteProduct,
};
