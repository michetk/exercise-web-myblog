const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('../articles/Article')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminauth')

router.get('/admin/articles', adminAuth, (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles: articles
        })
    })
})

router.get('/admin/articles/new', adminAuth, (req, res) => {
    Category.findAll({
        order: [
            ['title', 'ASC']
        ]
    }).then(categories => {
        res.render('admin/articles/article_new', {
            categories: categories
        })
    })
})

router.post('/articles/save', (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category
    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })

})

router.post('/articles/delete', (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })
        } else {
            res.redirect('/admin/articles')
        }
    } else {
        res.redirect('/admin/articles')
    }
})

router.get('/admin/articles/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id
    Article.findByPk(id).then(article => {
        if (id != undefined) {
            Category.findAll().then(categories => {
                res.render('admin/articles/article_edit', {
                    categories: categories,
                    article: article,
                })
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

router.post('/articles/update', (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    Article.update({
        title: title,
        body: body,
        categoryId: category,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles')
    }).catch(err => {
        res.redirect('/')
    })
})

router.get('/article/page/:num', (req, res) => {
    let page = req.params.num
    let offset = 0

    if (isNaN(page) || page == 1) {
        offset = 0
    } else {
        offset = (parseInt(page) - 1) * 4
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        let next
        if (offset + 4 >= articles.count) {
            next = false
        } else {
            next = true
        }

        if (page == 1) {
            prevpage = false
        } else {
            prevpage = true
        }

        let result = {
            pagenext: (parseInt(page) + 1),
            pageprev: (parseInt(page) - 1),
            prevpage: prevpage,
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/article_page', {
                result: result,
                categories: categories
            })
        })
    })
})

module.exports = router