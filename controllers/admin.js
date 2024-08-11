const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // __dirname gives path of current file
    res.render('admin/add-product', { pageTitle: 'Add Product' });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(null, title, imageUrl, description, price);
    product.save().then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { pageTitle: 'Edit Product', product: product });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const prodTitle = req.body.title;
    const prodImageUrl = req.body.imageUrl;
    const prodPrice = req.body.price;
    const prodDescription = req.body.description;
    const updatedProduct = new Product(prodId, prodTitle, prodImageUrl, prodDescription, prodPrice);
    updatedProduct.save();
    res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
    // Product.fetchAll((products) => {
    //     // console.log(products); // when I am sending new request why this data persist
    //     // res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname gives path of current file
    //     res.render('admin/products', { docTitle: 'Admin Products', prods: products });
    // });

    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('admin/products', { docTitle: 'Admin Products', prods: rows });
        })
        .catch(error => {
            console.log(error);
        })
};
