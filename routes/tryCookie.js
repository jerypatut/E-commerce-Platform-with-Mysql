const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
const cookie = req.get('cookie')
console.log(cookie)
});
router.post('/', (req, res) => {
    res.cookie("isLoggedIn", "true");
    res.send("Cookie send")

    })
module.exports = router;
