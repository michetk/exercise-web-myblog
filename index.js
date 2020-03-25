const express = require('express')
const app = express()
const connection = require('./database/database')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

// path static
app.use(express.static('public'))

// body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//rotas
app.get('/', (req, res) => {
    res.render('index')
})

// database
connection
    .authenticate()
    .then(() => {
        console.log('DATABASE CONECTADO COM SUCESSO!')
    })
    .catch((err) => {
        console.log('FALHA AO CONECTAR COM DATABASE!')
    })

const PORT = 8081
app.listen(PORT, (err) => {
    let server_msg = !err ? "SERVIDOR CONECTADO!" : "FALHA NO SERVIDOR!"
    console.log(server_msg)
})