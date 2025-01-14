const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pizzaria', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database!");
}).catch((error) => {
    console.log("Error connecting to database:", error);
});

sequelize.sync().then(() => {
    console.log('Tables created successfully or already exist.');
}).catch((err) => {
    console.error('Error creating tables:', err);
});

module.exports = sequelize;