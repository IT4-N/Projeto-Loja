const Sequelize = require('sequelize');
const database = require('../db');

// Adding pizzas (product without a stock)
const AddProductsNoStock = database.define('productsNoStock', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
}, {
    freezeTableName: true
});

module.exports = AddProductsNoStock;