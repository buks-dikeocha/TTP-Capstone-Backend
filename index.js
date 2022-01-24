const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")

const app = express()

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello Mars")
})

app.listen(5432, () => {
    console.log("yay")
})