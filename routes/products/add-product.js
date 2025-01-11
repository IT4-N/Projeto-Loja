const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('add-product-page', { title: 'Adicionar produto' });
});

module.exports = router;