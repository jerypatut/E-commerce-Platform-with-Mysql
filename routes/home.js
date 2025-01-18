const express = require('express')
const { renderProducts } = require('../controller/productController')
const router = express.Router()
const cookieParser = require('cookie-parser')


router.use(cookieParser())

router.get('/',renderProducts);



router.use((req, res, next) => {
    const cookie = req.cookies || {}; // Ambil cookie dari request
    const isLoggedIn = cookie.isLoggedIn || "false"; // Fallback ke "false" jika tidak ada
    res.locals.isLoggedIn = isLoggedIn === "true"; // Konversi ke boolean
    next();
});



module.exports = router;