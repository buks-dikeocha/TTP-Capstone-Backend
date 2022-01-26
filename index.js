const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")
const bcrypt = require("bcryptjs")
const pool = require("./db")
const { validEmail, validPassword } = require("./validate")

const app = express()

const PORT = 5001

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.json({a: "Web"})
// })

// sign up
app.post("/signup", async (req, res) => {
	try {
		const { fn, ln, e, pw, dob, p, bt, i, ep } = req.body

		let errors = {}

		if (!validEmail(e)) {
			errors.email = "Invalid email"
		}

		if (!validPassword(pw)) {
			errors.password = "Invlaid password"
		}

		const usingEmail = await pool.query(
			`
            SELECT * FROM "users"
            WHERE email = $1
        `,
			[e]
		)

		if (usingEmail.rows.length > 0) {
			errors.email = "Email in use"
		}

		if (Object.keys(errors).length > 0) {
			res.status(400).json(errors)
		}

		const salts = await bcrypt.genSalt(10)
		const pw_enc = await bcrypt.hash(pw, salts)

		const newUser = await pool.query(
			`
            INSERT INTO "users" (firstname, lastname, email, password, dob, phone, bloodtype, insurancename, emergencyphone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `,
			[fn, ln, e, pw_enc, dob, p, bt, i, ep]
		)

		res.json(newUser.rows[0])

		// res.send("post")
	} catch (error) {
		console.error(error.message)
	}
})

// log in
app.post("/login", async (req, res) => {
	try {
		const { email, pass } = req.body

		let errors = {}

		// find email in database
		const emails = await pool.query(
			`
            SELECT * FROM users WHERE email = $1
        `,
			[email]
		)

		if (emails.rows.length > 0) {
			const isMatch = await bcrypt.compare(pass, emails.rows[0].password)
			if (!isMatch) {
				errors.password = "Incorrect password"
			}
		} else {
			errors.email = "No account with that email"
		}

		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors)
		}

		res.json(emails.rows[0])
	} catch (error) {
		console.error(error)
	}
})

// crud goal
app.get("/goals", async (req, res) => {
	try {
		// const {desc} = req.body
		const goals = await pool.query(`
            SELECT * from goal
        `)

		res.json(goals.rows)
	} catch (error) {
		console.error(error.message)
	}
})

// // crud appointment
// app.get("/visits", async (req, res) => {
// 	try {
// 		const visits = await pool.query(`
//             SELECT * from visit
//         `)

// 		res.json(visits.rows)
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

// app.post("/visits", async (req, res) => {
// 	try {
// 		const { reason, clinicname, lastvisit } = req.body

// 		const newVisit = await pool.query(
// 			`
//             INSERT INTO visit (reason, clinicname, lastvisit)
//             VALUES ($1, $2, $3)
//             RETURNING *
//         `,
// 			[reason, clinicname, lastvisit]
// 		)

// 		res.json(newVisit.rows[0])
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

// app.put("/visits/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const { reason, clinicname, lastvisit } = req.body

// 		const newVisit = await pool.query(
// 			`
//             UPDATE visit
//             SET reason = $1, clinicname = $2, lastvisit = $3
//             WHERE visitid = $4
//             RETURNING *
//         `,
// 			[reason, clinicname, lastvisit, id]
// 		)

// 		res.json(newVisit.rows[0])
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

// app.delete("/visits/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params

// 		const toDel = await pool.query(
// 			`
//             DELETE FROM visit
//             WHERE visitid = $1
//         `,
// 			[id]
// 		)

// 		res.json("deleted")
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

app.post("/goals", async (req, res) => {
	try {
		const { fitness, nutrition, exercise } = req.body
		const newGoal = await pool.query(
			`
            INSERT INTO goal (fitness, nutrition, exercise)
            VALUES ($1,$2,$3)
            RETURNING *
        `,
			[fitness, nutrition, exercise]
		)

		res.json(newGoal.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

//get all goals
app.get("/goals", async (raq, res) => {
	try {
		const allGoal = await pool.query(`
            SELECT * FROM goal
        `)

		res.json(allGoal.rows)
	} catch (error) {
		console.error(error.message)
	}
})

//get a goal
app.get("/goals/:id", async (req, res) => {
	try {
		const { id } = req.params
		const oneGoal = await pool.query(
			`
            SELECT * FROM goal WHERE id=$1
        `,
			[id]
		)
		res.json(oneGoal.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

//update goal
app.put("/goals/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { fitness, nutrition, exercise } = req.body
		const updateGoal = await pool.query(
			`
            UPDATE goal SET fitness=$1,nutrition=$2,exercise=$3 WHERE id=$4
        `,
			[fitness, nutrition, exercise, id]
		)
		res.json("Goal was updated!")
	} catch (error) {
		console.error(error.message)
	}
})

//delete a goal
app.delete("/goals/:id", async (req, res) => {
	try {
		const { id } = req.params
		const deleteGoal = await pool.query(
			`
            DELETE FROM goal WHERE id=$1
        `,
			[id]
		)
		res.json("goal was deleted!")
	} catch (error) {
		console.log(error.message)
	}
})

app.get("/user/:userid/visits", async (req, res) => {
	// get all visits of user (change to use username instead of id)
	try {
		const { userid } = req.params

		console.log(userid)

		const allVisitsOfUser = await pool.query(
			`
            SELECT users.firstname, users.lastname, visit.visitid, visit.reason, visit.clinicname, visit.lastvisit
            FROM user_visit
            INNER JOIN users
            ON users.userid = user_visit.user_id
            INNER JOIN visit
            ON visit.visitid = user_visit.visit_id
            WHERE users.userid = $1
        `,
			[userid]
		)

		res.json(allVisitsOfUser.rows)
	} catch (error) {
		console.error(error.message)
	}
})

// userid passed into fetch from state on frontend
app.post("/user/:userid/visits", async (req, res) => {
	try {
		const { userid } = req.params
		const { reason, clinicname, lastvisit } = req.body

		// add to visit table
		const newVisit = await pool.query(
			`
            INSERT INTO visit (reason, clinicname, lastvisit)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
			[reason, clinicname, lastvisit]
		)

		// add to user_visit table
		const newJoint = await pool.query(
			`
			INSERT INTO user_visit
			(user_id, visit_id)
			VALUES ($1, $2);		
		`,
			// take the newly made visit id and use it in the joint table here
			[userid, newVisit.rows[0].visitid]
		)

		res.json(newVisit.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

// since visit table has a serial primary key, no two visit ids will be the same, so dont have to specify a user in the url
app.put("/visits/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { reason, clinicname, lastvisit } = req.body

		const newVisit = await pool.query(
			`
            UPDATE visit
            SET reason = $1, clinicname = $2, lastvisit = $3
            WHERE visitid = $4
            RETURNING *
        `,
			[reason, clinicname, lastvisit, id]
		)

		res.json(newVisit.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

app.delete("/visits/:id", async (req, res) => {
	try {
		const { id } = req.params
		const toDel = await pool.query(
			`
			DELETE FROM user_visit
			WHERE visit_id = $1
		`,
			[id]
		)

		// delete from visit table as well

		res.json("appointment deleted")
	} catch (error) {
		console.error(error)
	}
})

app.listen(PORT, () => {
	console.log(`opened on ${PORT}`)
})
