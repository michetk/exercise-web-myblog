const Sequelize = require('sequelize')

connection = new Sequelize('myblog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection