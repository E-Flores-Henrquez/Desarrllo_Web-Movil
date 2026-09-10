const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('graphql_productos', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
});

const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
});

sequelize.sync();

module.exports = Producto;