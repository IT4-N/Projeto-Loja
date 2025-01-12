const Sequelize = require('sequelize');
const database = require('../db');

const AddProductsStock = database.define('productsStock', {
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
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = AddProductsStock;