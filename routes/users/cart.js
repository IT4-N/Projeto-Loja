const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
    res.render('cart-page', {
        cart: cart,
        title: 'Carrinho',
        message: req.query.message || ''
    });
});

router.post('/', (req, res) => {
    const { tradPizzaSize, tradPizzaName } = req.body;

    if (!tradPizzaSize || !tradPizzaName) {
        return res.redirect('/cart-page?message=Por favor, selecione o tamanho e pelo menos uma pizza.');
    }

    const addItemToCart = (name) => {
        cart.push({ id: Date.now(), tradPizzaSize, tradPizzaName: name });
    };

    if (Array.isArray(tradPizzaName)) {
        tradPizzaName.forEach(name => addItemToCart(name));
    } else {
        addItemToCart(tradPizzaName);
    }

    res.redirect('/cart-page?message=Pizza adicionada ao carrinho com sucesso!');
});

module.exports = router;