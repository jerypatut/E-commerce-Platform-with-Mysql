require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const compression = require('compression');
// Import Routes
const productsRoutes = require('./routes/productRoutes');
const tryCookies = require('./routes/tryCookies');
const authRouter = require('./routes/authRouter');

const app = express();
const port = process.env.PORT || 3000;

// Setup template engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(compression()); // Mengaktifkan compression untuk meningkatkan kecepatan response
app.use(tryCookies); // Middleware yang akan mencoba mengambil cookie sebelumnya
app.use(express.json()); // Untuk menerima JSON request
app.use(express.urlencoded({ extended: true })); // Untuk menerima form-urlencoded request
app.use(cookieParser());

// Setup public folder (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Setup storage untuk session di MySQL
//server side session
const sessionStore = new MysqlStore({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'nodemysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'jeri', // Jangan hardcode
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 10 * 60 * 1000, // 10 menit
      httpOnly: true, // Mencegah akses cookie dari JS (lebih aman)
      secure: process.env.NODE_ENV === 'production', // Gunakan secure cookie hanya di production
    },
  }),
);

// Setup folder untuk upload gambar
app.use('/uploads', express.static(path.join(__dirname, 'assets/uploads')));

// Routes
app.use('/', productsRoutes);
app.use('/', authRouter);
app.use('/trycookies', tryCookies);

// Catch-all route untuk menangani halaman yang tidak ditemukan
app.use('*', (req, res) => {
  res.status(404).send(`
    <h1>404 - Not Found</h1>
    <p>The requested URL ${req.originalUrl} was not found on this server.</p>
  `);
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
