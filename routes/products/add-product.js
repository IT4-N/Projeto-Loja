const express = require('express');
const router = express.Router();
const AddProductsNoStock = require('../models/productsNoStock');
const AddProductsStock = require('../models/productsStock');

router.get('/', (req, res) => {
    res.render('add-product-page', { title: 'Adicionar produto' });
});

module.exports = router;