const express = require('express');
const router = express.Router();
const AddProductsNoStock = require('../../models/productsNoStock');

router.get('/', (req, res) => {
    const supPrice = parseFloat(52);

    AddProductsNoStock.findAll()
    .then((noStockProducts) => {
        res.render('supreme-pizza-page', {
            noStockProducts: noStockProducts,
            supPrice: supPrice,
            title: 'Pizzas supreme'
        });
    })
    .catch(err => {
        console.error('Error fetching products: ', err);
        res.render('menu-page', { error: 'Error fetching products.' });
    });
});

module.exports = router