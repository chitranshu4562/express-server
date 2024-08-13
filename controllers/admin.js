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

    req.user.createProduct({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    }).then(result => {
        console.log(result);
        res.redirect('/');
    }).catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('admin/edit-product', { pageTitle: 'Edit Product', product: product });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const prodTitle = req.body.title;
    const prodImageUrl = req.body.imageUrl;
    const prodPrice = req.body.price;
    const prodDescription = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = prodTitle;
            product.description = prodDescription;
            product.imageUrl = prodImageUrl;
            product.price = prodPrice;
            return product.save();
        })
        .then(result => {
            console.log('Product is updated successfully.');
            res.redirect('/products');
        })
        .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        }).then(result => {
            console.log('Product is deleted successfully.');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
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
