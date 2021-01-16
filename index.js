const http = require('http')
const listener = function (req, res) {
    res.send('Hellooo')
}

server = http.createServer(listener)
server.listen(4000)