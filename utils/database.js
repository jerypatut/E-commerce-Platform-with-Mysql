const mysql = require('mysql2');

// Membuat koneksi ke database menggunakan pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  // Gantilah dengan password yang sesuai
    database: 'mystore',  // Nama database yang sesuai
    port: 3306,  // Port default untuk MySQL
    multipleStatements: true  // Memungkinkan menjalankan beberapa query dalam satu statement
});

// Cek koneksi ke database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database!');
        connection.release();  // Pastikan koneksi dibebaskan setelah digunakan
    }
});

// Mengekspor pool yang menggunakan promise untuk operasi database yang lebih mudah
module.exports = pool.promise();
