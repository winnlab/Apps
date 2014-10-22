express = require 'express'
router = express.Router()

# All routes to default page
pages = [
    '/'
    '/intro'
    '/fun'
    '/share'
]

# Function that proceed and render default page
render = (req, res) ->
    res.render 'index',
        title: 'Apps'

# Binding pages to express router
pages.forEach (page) ->
    router.get page, render

module.exports = router;
