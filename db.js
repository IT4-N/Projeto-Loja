const Sequelize = require('sequelize');
const sequelize = new Sequelize('pizzaria', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
});

sequelize.authenticate().then(function () {
    console.log("Connected to database!")
}).catch(function (error) {
    console.log("Error connecting to database.")
});

sequelize.sync() .then(() => { 
    console.log('Tables created succesfully or already exists.'); 
}).catch(err => { 
    console.error('Error creating tables:', err);
});

module.exports = sequelize;