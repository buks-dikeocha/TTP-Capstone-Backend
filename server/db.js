const Pool=require("pg").Pool;
const pool=new Pool({
user: "postgres",
password:"",  //depend on the pc which run the project
host:"localhost",
port:5432,
database:"perntodo"
});
module.exports=pool;