const pool = require('../db/connectDb');

class Users {
  constructor(id, userName, password) {
    this.id = id;
    this.userName = userName;
    this.password = password;
  }

  // Metode instance untuk memasukkan user ke database
  async insertUser() {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (userName, password) VALUES (?, ?)',
        [this.userName, this.password],
      );
      return result;
    } catch (err) {
      console.error('❌ Error inserting user:', err);
      throw err;
    }
  }

  // Metode instance untuk mengambil user dari database berdasarkan userName
  static fetchUsersbyUsername(username) {
    return pool.query('SELECT * FROM users WHERE userName =?', [username]);
  }
}

module.exports = Users;
