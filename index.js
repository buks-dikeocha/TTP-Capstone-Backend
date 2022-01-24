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

// app.get("/", async())

app.post("/users", async (req, res) => {
    try {
        const {fn, ln, e, pw, dob, p, bt, i, ep} = req.body

        const newUser = await pool.query(`
            INSERT INTO "user" (firstname, lastname, email, password, dob, phone, bloodtype, insurancename, emergencyphone)
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


app.listen(5000, () => {
    console.log("opened on 5000")
})