const pool = require('../utils/database');

module.exports = class Products {
    constructor(id, productname, price, img, dekskripsi) {
        this.id = id; // Optional for update operation, not needed for insert operation
        this.productname = productname;
        this.price = price;
        this.img = img;
        this.dekskripsi = dekskripsi;
    }

    // Fetch semua produk 
    static fetchProducts() {
        return pool.execute("SELECT * FROM products");
    }

    postData() {
        return pool.execute(
            "INSERT INTO products (productname, price, img, dekskripsi) VALUES (?, ?, ?, ?)",
            [this.productname, this.price, this.img, this.dekskripsi]
        );
    }


    // Fetch produk berdasarkan id
    static fetchProductById(id) {
        return pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    }

    // Simpan produk baru
 
    static deleteProductById(id) {
        return pool.execute("DELETE FROM products WHERE id = ?", [id]);
    }

    // Edit data produk
    editData() {
        return pool.execute(
            "UPDATE products SET productname = ?, price = ?, img = ?, dekskripsi = ? WHERE id = ?",
            [this.productname, this.price, this.img, this.dekskripsi, this.id]
        );
    }
};
