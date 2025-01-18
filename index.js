const express = require('express');
const app = express();
const port = 3000;

// Routes
const home = require('./routes/home');
const addProduct = require('./routes/addProduct');
const editProduct = require('./routes/editProduct');
const deleteProduct = require('./routes/deleteProduct');
const tryCookie = require('./routes/tryCookie');
const userAuth = require('./routes/userAuth');

// Middlewares
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

// Set up ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// MySQL session store options
const options = {
  connectionLimit: 10,
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystore',
};

// Create session store with MySQL options
const sessionStore = new MysqlStore(options);

// Set up session middleware
app.use(
  session({
    secret: 'it is secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Store session in MySQL
    cookie: { secure: false }, // Set to false in local dev, true for production with HTTPS
  }),
);

// Route to test session
app.get('/trySession', (req, res) => {
  res.send(req.session.isLoggedIn);
});

// Use routes
app.use('/', home);
app.use('/add-product', addProduct);
app.use('/edit-product', editProduct);
app.use('/delete-product', deleteProduct);
app.use('/tryCookie', tryCookie);
app.use('/', userAuth);

// Serve static files (CSS, images, etc.)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Error handling middleware (optional - you can define custom error handling if needed)

// Start the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
