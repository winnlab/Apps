path = require 'path'
express = require 'express'
bodyParser = require 'body-parser'

routes = require './routes/index'

app = express()

# view engine setup
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)
app.use express.static "#{__dirname}/../client"

app.use '/', routes

# catch 404 and forward to error handler
app.use (req, res, next) ->
    err = new Error 'Not Found'
    err.status = 404;
    next err

# error handlers
app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
        message: err.message,
        error: {}

module.exports = app;
