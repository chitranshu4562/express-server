const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');

const app = express();

// db.execute('select * from products')
// .then(([data, fieldDefinition]) => {
//     console.log('DB query result: ', result);
// })
// .catch((err) => {
//     console.log('Error while db connection: ', err);
// });


// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // to serve file statically

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

sequelize.sync()
    .then(result => {
        // server
        app.listen(3000, () => {
            console.log('App server is running on port 3000.');
        });
    })
    .catch(err => {
        console.log(err);
        
    });

