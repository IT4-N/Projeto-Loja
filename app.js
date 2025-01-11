const express = require('express');
const bp = require('body-parser');
const sequelize = require('./db');
const { engine } = require('express-handlebars');
const app = express();

// Importing routes
const mainRoute = require('./routes/main');
const addProductRoute = require('./routes/products/add-product');
const menuRoute = require('./routes/menu/menu');

// Setting BP
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.static('./public'));

// Setting Handlebars
app.set('view engine', 'handlebars');
app.set('views', './views');
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

// Using routes
app.use('/', mainRoute);
app.use('/add-product-page', addProductRoute);
app.use('/menu-page', menuRoute);

sequelize.sync() .then(() => { 
    console.log('Tables created succesfully or already exists.'); 
}).catch(err => { 
    console.error('Error creating tables:', err);
});

// Server port
app.listen(4444, () => {
    console.log("Servidor rodando em: http://localhost:4444");
});

module.exports = app;