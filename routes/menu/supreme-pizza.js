const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('supreme-pizza-page', { title: 'Pizzas supreme' });
});

module.exports = router