const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    req
})

app.listen(5432, () => {
    console.log("yay")
})