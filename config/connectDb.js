const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan password MySQL kamu
  database: 'nodemysql', // Sesuaikan dengan nama database kamu
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Cek koneksi ke database
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL server:', err.message);
    return;
  }
  console.log('✅ Connected to the MySQL server');
  connection.release(); // Kembalikan koneksi ke pool
});

// Ekspor versi pool yang bisa pakai async/await
module.exports = pool.promise();
