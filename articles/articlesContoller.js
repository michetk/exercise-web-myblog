const express = require('express')
const router = express.Router()

router.get('/articles', (req,res) => {
    res.send('ARTICLES')
})

router.get('/admin/articles/new', (req, tes) => [
    res.send('ADMIN ARTICLES NEW')
])

module.exports = router