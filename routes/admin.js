const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/admin-products', adminController.getProducts);


exports.routes = router;