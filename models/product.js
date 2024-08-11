// const fs = require('fs');
// const path = require('path');

// const rootDirectory = require('../util/path');
// const fileDirectory = path.join(rootDirectory, 'data', 'products.json');

// const getProductsFromFile = (callback) => {
//     fs.readFile(fileDirectory, (error, fileContent) => {
//         if (error) {
//             return callback([]);
//         }
//         return callback(JSON.parse(fileContent));
//     });
// };

const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)',
            [this.title, this.description, this.imageUrl, this.price]
        );
    }

    // save() {
    //     getProductsFromFile((products) => {
    //         if (this.id) {
    //             const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //             const updatedProducts = [...products];
    //             updatedProducts[existingProductIndex] = this;
    //             fs.writeFile(fileDirectory, JSON.stringify(updatedProducts), (err) => {
    //                 console.log('Error while writing data into products file: ', err);
    //             });
    //         } else {
    //             this.id = Math.random().toString();
    //             products.push(this);
    //             fs.writeFile(fileDirectory, JSON.stringify(products), (err) => {
    //                 console.log('Error while writing data into products file: ', err);
    //             });
    //         }
    //     });
    // }

    // static fetchAll(callback) {
    //     getProductsFromFile(callback);
    // }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    // static findById(prodId, callback) {
    //     getProductsFromFile((products) => {
    //         const prod = products.find((product) => product.id === prodId);
    //         callback(prod);
    //     });
    // }
}