const express = require('express')
const router = express.Router()

router.get('/categories', (req, res) => {
    res.send('ROUTER CATEGORIES')
})

router.get('/admin/categories/new', (req, res) => {
    res.send('ROUTER CATEGORIES NEW')
})

module.exports = router