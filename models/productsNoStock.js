const Sequelize = require('sequelize');
const database = require('../db');

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
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
}, {
    freezeTableName: true
});

module.exports = AddProductsNoStock;