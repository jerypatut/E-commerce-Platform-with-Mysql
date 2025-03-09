const pool = require('../db/connectDb');

class Products {
  constructor(id, productname, price, img, deskripsi) {
    this.id = id;
    this.productname = productname;
    this.price = price;
    this.img = img;
    this.deskripsi = deskripsi;
  }

  // ✅ Ambil semua produk
  static async fetchProducts() {
    try {
      const [rows] = await pool.execute('SELECT * FROM products');
      return rows; // Mengembalikan hasil query
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      throw err;
    }
  }
  // ✅ Ambil produk berdasarkan ID
  static async fetchProductById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
        id,
      ]);

      if (rows.length === 0) return null; // FIXED: Kembalikan `null` kalau tidak ada data

      return rows[0]; // FIXED: Mengembalikan objek produk langsung
    } catch (err) {
      console.error('❌ Error fetching product by ID:', err);
      throw err;
    }
  }

  // ✅ Tambah produk baru
  async postData() {
    try {
      console.log('🛠 Debugging Data Produk:', this);
      const [result] = await pool.execute(
        'INSERT INTO products (productname, price, img, deskripsi) VALUES (?, ?, ?, ?)',
        [this.productname, this.price, this.img, this.deskripsi],
      );
      return result;
    } catch (err) {
      console.error('❌ Error inserting product:', err);
      throw err;
    }
  }

  // ✅ Update produk di database
  async updateData() {
    try {
      const [result] = await pool.execute(
        'UPDATE products SET productname = ?, price = ?, img = ?, deskripsi = ? WHERE id = ?',
        [this.productname, this.price, this.img, this.deskripsi, this.id],
      );
      return result;
    } catch (err) {
      console.error('❌ Error updating product:', err);
      throw err;
    }
  }

  // ✅ Hapus produk di database
  static async deleteData(id) {
    try {
      const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [
        id,
      ]);
      return result;
    } catch (err) {
      console.error('❌ Error deleting product:', err);
      throw err;
    }
  }
}

module.exports = Products;
