const express = require('express')
const router = express.Router()

router.get('/categories', (req, res) => {
    res.send('ROUTER CATEGORIES')
})

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/category_new')
})

module.exports = router