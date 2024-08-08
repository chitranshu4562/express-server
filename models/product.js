const fs = require('fs');
const path = require('path');

const rootDirectory = require('../util/path');
const fileDirectory = path.join(rootDirectory, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(fileDirectory, (error, fileContent) => {
        if (error) {
            return callback([]);
        }
        return callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(fileDirectory, JSON.stringify(products), (err) => {
                console.log('Error while writing data into products file: ', err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}