const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('traditional-pizza-page', { title: 'Pizzas tradicionais' });
});

module.exports = router