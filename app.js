const express = require('express');
const bp = require('body-parser');
const { engine } = require('express-handlebars');
const app = express();

// Importing tables 
const AddProductsNoStock = require('./models/productsNoStock');
const AddProductsStock = require('./models/productsStock');

// Importing routes
const mainRoute = require('./routes/main');
const addProductRoute = require('./routes/products/add-product');
const editProductRoute = require('./routes/products/edit-product');
const menuRoute = require('./routes/menu/menu');
const tradPizzaRoute = require('./routes/menu/traditional-pizza');
const supPizzaRoute = require('./routes/menu/supreme-pizza')

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
app.use('/edit-product-page', editProductRoute);
app.use('/menu-page', menuRoute);
app.use('/traditional-pizza-page', tradPizzaRoute);
app.use('/supreme-pizza-page', supPizzaRoute);

// Server port
app.listen(4444, () => {
    console.log("Servidor rodando em: http://localhost:4444");
});

module.exports = app;