const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")
const pool = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    console.log(req.body)
})

app.listen(5432, () => {
    console.log("yay")
})