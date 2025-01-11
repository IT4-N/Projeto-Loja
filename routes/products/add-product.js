const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('add-product-page', { title: 'Adicionar produto' });
});

module.exports = router;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'  // ou 'postgres', 'sqlite', etc.
});

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true  // Evita que o Sequelize pluralize o nome da tabela
});

sequelize.sync()
    .then(result => {
        console.log('Tabela criada com sucesso');
    })
    .catch(err => {
        console.error('Erro ao criar a tabela:', err);
    });
