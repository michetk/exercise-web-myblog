const Sequelize = require('sequelize')

connection = new Sequelize('myblog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection