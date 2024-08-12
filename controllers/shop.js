const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res) => {
    // Product.fetchAll((products) => {
    //     console.log(products); // when I am sending new request why this data persist
    //     // res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname gives path of current file
    //     res.render('shop/product-list', { docTitle: 'My Shop', prods: products });
    // });

    Product.findAll()
        .then(products => {
            res.render('shop/product-list', { docTitle: 'My Shop', prods: products });
        })
        .catch(error => console.log(error));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findById(prodId, (product) => {
    //     res.render('shop/product-detail', { docTitle: 'Product detail', product: product });
    // });
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', { docTitle: 'Product detail', product: product });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIndex = (req, res) => {
    // Product.fetchAll((products) => {
    //     // console.log(products); // when I am sending new request why this data persist
    //     // res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname gives path of current file
    //     res.render('shop/index', { docTitle: 'My Shop', prods: products });
    // });

    Product.findAll()
        .then(products => {
            res.render('shop/index', { docTitle: 'My Shop', prods: products });
        })
        .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { docTitle: 'Cart' });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    });
    res.redirect('/products');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Checkout' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { docTitle: 'Your Orders' });
};