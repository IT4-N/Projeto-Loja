const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main-page', { title: 'Página Inicial' });
});

module.exports = router;