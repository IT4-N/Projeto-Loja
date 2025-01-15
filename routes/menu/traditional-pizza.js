const express = require('express');
const router = express.Router();
const AddProductsNoStock = require('../../models/productsNoStock');

router.get('/', (req, res) => {
    // const tradBigPrice = 43;
    // const tradLargePrice = 49;
    // let totalPrice;

    // if (req.body.tradPizzaSize === 'Grande') {
    //     totalPrice = tradBigPrice
    // } else if (req.body.tradPizzaSize === 'Família') {
    //     totalPrice = tradLargePrice
    // }

    AddProductsNoStock.findAll()
    .then((noStockProducts) => {
        res.render('traditional-pizza-page', {
            noStockProducts: noStockProducts,
            // totalPrice: totalPrice,
            title: 'Pizza tradicional'
        });
    })
    .catch(err => {
        console.error('Error fetching products: ', err);
        res.render('menu-page', { error: 'Error fetching products.' });
    });
});

module.exports = router