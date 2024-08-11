const fs = require('fs');
const path = require('path');

const rootDirectory = require('../util/path');
const fileDirectory = path.join(rootDirectory, 'data', 'cart.json');

module.exports = class Cart {
    static addToCart(productId, productPrice) {
        let cart = { products: [], totalPrice: 0 };
        fs.readFile(fileDirectory, (error, fileContent) => {
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            let updatedProduct;
            const existingProductIndex = cart.products.findIndex(prod => prod.id === productId);
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                existingProduct.quantity += 1;
                cart.products = [...cart.products];
            } else {
                updatedProduct = { id: productId, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(fileDirectory, JSON.stringify(cart), (error) => {
                console.log(error);
            })
        });
    }
};