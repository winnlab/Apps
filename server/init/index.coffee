app = require '../app'

app.set 'port', process.env.PORT or 80

server = app.listen app.get('port'), ->
  console.log "Express server listening on port #{server.address().port}"
