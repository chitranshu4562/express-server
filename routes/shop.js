const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res) => {
    console.log(adminData.products); // when I am sending new request why this data persist
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname gives path of current file
});

module.exports = router;