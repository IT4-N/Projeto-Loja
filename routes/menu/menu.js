const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('menu-page', { title: 'Cardápio' });
});

module.exports = router;