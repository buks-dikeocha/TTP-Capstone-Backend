const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "bg121902",  //depend on the pc which run the project
    host: "localhost",
    port: 5432,
    database: "ttpcapstone"
});

module.exports = pool; 