const http = require('http')
const port = process.env | 8080

const server = http.createServer((req, res) => {
  console.log('received request')
  
  switch (req.url) {
    case "/":
      res.write("Hello World! [robotic] SHOW ME WHAT YOU GOT!")
      break;
    default:
      res.statusCode = 404
      res.write("Four, oh four: Page not found")
  }
  res.end()
})

module.exports.start = async () => {
  server.listen(port, () => {
    console.log('Web server listening on port ' + port)
  })
}
