const express = require('express');
const router = express.Router();
const AddProductsStock = require('../../models/productsStock');
const AddProductsNoStock = require('../../models/productsNoStock');

// Rendering 'edit product' page, along with the product's ID
router.get('/:id', (req, res) => {
    Promise.all([
        AddProductsStock.findByPk(req.params.id),
        AddProductsNoStock.findByPk(req.params.id)
    ])
    .then(([stockProduct, noStockProduct]) => {
        if (stockProduct) {
            res.render('edit-product-page', { product: stockProduct, type: 'bebida' });
        } else if (noStockProduct) {
            res.render('edit-product-page', { product: noStockProduct, type: 'pizza' });
        } else {
            res.send('Product not found.');
        }
    })
    .catch(err => {
        console.error('Error fetching product: ', err);
        res.send('Error fetching product.');
    });
});

// Editing the product
router.post('/:id', (req, res) => {
    const { newProductName, newProductQty, newProductPrice, type } = req.body;

    if (type === 'bebida') {
        AddProductsStock.update(
            { name: newProductName, quantity: newProductQty, price: newProductPrice },
            { where: { id: req.params.id } }
        )
        .then((result) => {
            if (result[0] === 0) {
                res.send('Product not found in stock.');
            } else {
                res.redirect('/add-product-page');
            }
        })
        .catch(err => {
            console.error('Error editing stock product: ', err);
            res.send('Error editing stock product: ' + err.message);
        });
    } else if (type === 'pizza') {
        AddProductsNoStock.update(
            { name: newProductName, price: newProductPrice },
            { where: { id: req.params.id } }
        )
        .then((result) => {
            if (result[0] === 0) {
                res.send('Product not found in no stock.');
            } else {
                res.redirect('/add-product-page');
            }
        })
        .catch(err => {
            console.error('Error editing no stock product: ', err);
            res.send('Error editing no stock product: ' + err.message);
        });
    } else {
        res.send('Invalid product type.');
    }
});

module.exports = router;
