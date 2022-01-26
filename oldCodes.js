// crud goal
// app.get("/goals", async (req, res) => {
// 	try {
// 		// const {desc} = req.body
// 		const goals = await pool.query(`
//             SELECT * from goal
//         `)

// 		res.json(goals.rows)
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

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
