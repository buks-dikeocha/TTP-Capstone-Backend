const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")
const pool = require("./db")

const app = express()

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

app.post("/", async (req, res) => {
    const body = req.body

    const newUser = await pool.query(`
        INSERT INTO user (firstname, lastname, email, password, dob,
        phone, bloodtype, insurancename, emergencyphone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
    `, ["jon", "don", "b@m", "123", "1/1/2000", "1234", "a", "insurance", "12345"])

    res.json(newUser)
})

app.listen(5000, () => {
    console.log("opened on 5432")
})