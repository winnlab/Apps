# debug = require('debug')('myapp')
app = require '../app'

app.set 'port', process.env.PORT or 3002

server = app.listen app.get('port'), ->
  # debug "Express server listening on port #{server.address().port}"
  console.log "Express server listening on port #{server.address().port}"
