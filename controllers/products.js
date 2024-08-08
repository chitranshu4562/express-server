const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // __dirname gives path of current file
    res.render('add-product', { pageTitle: 'Add Product' });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    const products = Product.fetchAll((products) => {
        console.log(products); // when I am sending new request why this data persist
        // res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname gives path of current file
        res.render('shop', { docTitle: 'My Shop', prods: products });    
    });
};