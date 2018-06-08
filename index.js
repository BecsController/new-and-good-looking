const server = require('./server')

var PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', PORT)
})
