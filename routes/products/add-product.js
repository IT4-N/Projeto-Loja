const express = require('express');
const router = express.Router();
const AddProductsStock = require('../../models/productsStock');
const AddProductsNoStock = require('../../models/productsNoStock');

// Rendering product page and listing all products on database
router.get('/', (req, res) => {
    Promise.all([
        AddProductsStock.findAll(),
        AddProductsNoStock.findAll()
    ])
    .then(([stockProducts, noStockProducts]) => {
        res.render('add-product-page', { 
            stockProducts: stockProducts,
            noStockProducts: noStockProducts,
            title: 'Adicionar produto'
        });
    })
    .catch(err => {
        console.error('Error fetching products: ', err);
        res.render('add-product-page', { error: 'Error fetching products.'});
    });
});

// Creating products on database and website
router.post('/', (req, res) => {
    const productData = {
        name: req.body.productName,
        price: req.body.productPrice
    };

    if (req.body.productType === 'bebida') {
        AddProductsStock.create({
            ...productData,
            quantity: req.body.productQty
        })
        .then(() => {
            res.redirect('/add-product-page');
        })
        .catch(err => {
            console.error('Error adding product to stock: ', err);
            res.render('add-product-page', { error: 'Error adding product to stock: ' + err.message });
        });
    } else if (req.body.productType === 'pizza') {
        AddProductsNoStock.create({
            ...productData,
            type: req.body.productNoStockType
        })
        .then(() => {
            res.redirect('/add-product-page');
        })
        .catch(err => {
            console.error('Error adding product to no stock: ', err);
            res.render('add-product-page', { error: 'Error adding product to no stock: ' + err.message });
        });
    } else {
        res.render('add-product-page', { error: 'Por favor, selecione um tipo de produto válido.' });
    }
});

// Deleting products
router.get('/:id', (req, res) => {
    Promise.all([
        AddProductsStock.destroy({ where: { id: req.params.id }}),
        AddProductsNoStock.destroy({ where: { id: req.params.id }})
    ])
    .then(() => {
        res.redirect('/add-product-page')
    })
    .catch(err => {
        console.error('Error deleting product: ', err);
        res.render('add-product-page', { error: 'Error deleting product: ' + err.message })
    })
});

AddProductsStock.belongsTo(AddProductsNoStock, { foreignKey: 'id', onDelete: 'SET NULL', onUpdate: 'NO ACTION' });
AddProductsNoStock.hasMany(AddProductsStock, { foreignKey: 'id' });

module.exports = router;