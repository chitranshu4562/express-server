const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const sequelize = require('./util/database');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()
    .then(async () => {
        const user = await User.create({ name: 'Chitranshoo Prakash', email: 'chitranshoo@gmail.com' });
        const product = await user.createProduct({title: 'first title', description: 'first description', price: 12, imageUrl: 'first image url'});
        const cart = await user.createCart();
        await cart.addProduct(product);
        console.log('Data is created successfully');
    })
    .catch(err => console.log(err));