const express = require('express');
const router = express.Router();
const AddProductsStock = require('../../models/productsStock');
const AddProductsNoStock = require('../../models/productsNoStock');

// Rendering 'edit product' page for stock products (bebida)
router.get('/bebida/:id', (req, res) => {
    const productId = req.params.id;

    AddProductsStock.findByPk(productId)
        .then(stockProduct => {
            if (stockProduct) {
                res.render('edit-product-page', { product: stockProduct, productType: 'bebida' });
            } else {
                res.send('Product not found.');
            }
        })
        .catch(err => {
            console.error('Error fetching stock product: ', err);
            res.send('Error fetching stock product.');
        });
});

// Rendering 'edit product' page for no stock products (pizza)
router.get('/pizza/:id', (req, res) => {
    const productId = req.params.id;

    AddProductsNoStock.findByPk(productId)
        .then(noStockProduct => {
            if (noStockProduct) {
                res.render('edit-product-page', { product: noStockProduct, productType: 'pizza' });
            } else {
                res.send('Product not found.');
            }
        })
        .catch(err => {
            console.error('Error fetching no stock product: ', err);
            res.send('Error fetching no stock product.');
        });
});

// Editing stock products (bebida)
router.post('/bebida/:id', (req, res) => {
    const { newProductName, newProductQty, newProductPrice } = req.body;
    const productId = req.params.id;

    AddProductsStock.update(
        { name: newProductName, quantity: newProductQty, price: newProductPrice },
        { where: { id: productId } }
    )
        .then(() => {
            res.redirect('/add-product-page');
        })
        .catch(err => {
            console.error('Error editing stock product: ', err);
            res.send('Error editing stock product: ' + err.message);
        });
});

// Editing no stock products (pizza)
router.post('/pizza/:id', (req, res) => {
    const { newProductName, newProductNoStockType, newProductPrice } = req.body;
    const productId = req.params.id;

    AddProductsNoStock.update(
        { name: newProductName, type: newProductNoStockType, price: newProductPrice },
        { where: { id: productId } }
    )
        .then(() => {
            res.redirect('/add-product-page');
        })
        .catch(err => {
            console.error('Error editing no stock product: ', err);
            res.send('Error editing no stock product: ' + err.message);
        });
});

module.exports = router;