const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")
const pool = require("./db")

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Web")
})

app.post("/users", async (req, res) => {
    try {
        const {fn, ln, e, pw, dob, p, bt, i, ep} = req.body

        const newUser = await pool.query(`
            INSERT INTO "users" (firstname, lastname, email, password, dob, phone, bloodtype, insurancename, emergencyphone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `, [fn, ln, e, pw, dob, p, bt, i, ep])

        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }

})

// new goal


// new appointment


// connecting


app.listen(PORT, () => {
    console.log(`opened on ${PORT}`)
})