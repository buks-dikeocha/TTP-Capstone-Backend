const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")
const bcrypt = require("bcryptjs")
const pool = require("./db")

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.send("Web")
// })

// sign up
app.post("/signup", async (req, res) => {
    try {
        const {fn, ln, e, pw, dob, p, bt, i, ep} = req.body

        let errors = {}

        // check email

        //check password

        // is email in use

        const salts = await bcrypt.genSalt(10)
        const pw_enc = await bcrypt.hash(pw, salts)

        const newUser = await pool.query(`
            INSERT INTO "users" (firstname, lastname, email, password, dob, phone, bloodtype, insurancename, emergencyphone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `, [fn, ln, e, pw_enc, dob, p, bt, i, ep])

        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }

})

// log in
app.post("/login", async (req, res) => {
    try{
        const {email, pass} = req.body

        let errors = {}
    
        // find email in database
        const emails = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [email])
    
        if(emails.rows.length > 0){
            const isMatch = await bcrypt.compare(pass, emails.rows[0].password)
            if(!isMatch){
                errors.password = "Incorrect password"
            }
        }
        else{
            errors.email = "No account with that email"
        }
    
        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors)
        }
        
        res.json(emails.rows[0])
    }
    catch(error){
        console.error(error)
    }
})

// crud goal
app.get("/goals", async (req, res) => {
    try {
        const {desc} = req.body
    } catch (error) {
        console.error(error.message)
    }
})

// crud appointment
app.get("/visits", async (req, res) => {
    try {
        // select all from joint table
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/visits", async (req, res) => {
    try {
        const {reason, clinicName} = req.body

        const newVisit = await pool.query()

        res.json(newVisit)
    } catch (error) {
        console.error(error.message)
    }
})

// connecting


app.listen(PORT, () => {
    console.log(`opened on ${PORT}`)
})