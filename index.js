const express = require('express')
const app = express()
const connection = require('./database/database')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesContoller')
const usersController = require('./users/UserController')
const Category = require('./categories/Category')
const Article = require('./articles/Article')
const User = require('./users/User')
const session = require('express-session')
const flash = require('connect-flash')

// session
app.use(session({
    secret: Math.sqrt((9*8)) + 'asdfjASJUOL' + Math.sqrt((5*8+3)),
    cookie: {
        maxAge: 72000000
    },
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

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
app.use('/', usersController)

app.get('/', (req, res) => {
    Article.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {
                articles: articles,
                categories: categories
            })
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
            Category.findAll().then(categories => {
                res.render('article', {
                    article: article,
                    categories: categories
                })
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        raw: true,
        include: [{
            model: Article
        }]
    }).then(category => {
        if (slug != undefined) {
            Category.findAll({
                raw: true
            }).then(categories => {
                res.render('index', {
                    articles: category.articles,
                    categories: categories
                })
            })
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