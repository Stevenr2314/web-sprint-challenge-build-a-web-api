require('dotenv').config()
const server = require("./api/server")
const port = process.env.PORT || 9000

server.listen(port, () => console.log(`Api server running at http://localhost:${port}`))