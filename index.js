const express = require('express')
const app = express()
const connection = require('./database/database')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesContoller')
const Category = require('./categories/Category')
const Article = require('./articles/Article')

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
app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {
    Article.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        res.render('index', {
            articles: articles
        })
    })
})

app.get('/:slug', (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        },
    }).then(article => {
        if (slug != undefined) {
            res.render('article', {article: article})
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
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