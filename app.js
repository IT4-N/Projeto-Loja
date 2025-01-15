const hbs = require('handlebars');
const express = require('express');
const bp = require('body-parser');
const { engine } = require('express-handlebars');
const app = express();

// Importing tables for auto sync 
const AddProductsNoStock = require('./models/productsNoStock');
const AddProductsStock = require('./models/productsStock');

// Importing routes
const mainRoute = require('./routes/main');
const addProductRoute = require('./routes/products/add-product');
const editProductRoute = require('./routes/products/edit-product');
const menuRoute = require('./routes/menu/menu');
const cartRoute = require('./routes/users/cart');
const tradPizzaRoute = require('./routes/menu/traditional-pizza');
const supPizzaRoute = require('./routes/menu/supreme-pizza')

// Setting Body Parser
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
app.use('/cart-page', cartRoute);
app.use('/traditional-pizza-page', tradPizzaRoute);
app.use('/supreme-pizza-page', supPizzaRoute);

// Handlebars functions creation
hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

hbs.registerHelper('groupBy', function(array, key) {
    const groups = array.reduce((result, item) => {
        const value = item[key];
        result[value] = result[value] || { key: value, items: [] };
        result[value].items.push(item);
        return result;
    }, {});

    return Object.values(groups);
});

// Server port
app.listen(4444, () => {
    console.log("Servidor rodando em: http://localhost:4444");
});

module.exports = app;