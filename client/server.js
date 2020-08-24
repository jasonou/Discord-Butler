const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send("Ok"))

app.listen(port, () => console.log(`server.js listening on port: ${port}`))

module.exports = app;
