const express =require("express");
const app=express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//create a user
app.post("/users",async(req,res)=>{

 try{
   
    const{first_name,last_name,email,password_user,date_of_birth,phone_number,blood_type,insurance_company,emergency_phone}=req.body;
    const newUser=await pool.query("INSERT INTO users (first_name,last_name,email,password_user,date_of_birth,phone_number,blood_type,insurance_company,emergency_phone) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",[first_name,last_name,email,password_user,date_of_birth,phone_number,blood_type,insurance_company,emergency_phone]);
    res.json(newUser.rows[0]);
}catch(err){
   
  console.error(err.message);
 }
});

//get all users
app.get("/users",async(raq,res)=>{
  try{
    const allUsers=await pool.query("SELECT * FROM users");
    res.json(allUsers.rows)
  }catch(err){
      console.error(err.message)
  }
})

//get a user
app.get("/users/:id",async(req,res)=>{
  try{
      const{id}=req.params;
      const todo =await pool.query("SELECT * FROM users WHERE userid=$1",[id]);
      res.json(todo.rows[0]);
  }catch(err)
  {
         console.error(err.message);
  }
})

//update user information
app.put("/users/:id", async(req,res)=>{
    try{
     const{id}=req.params;
     const{first_name,last_name,email,password_user,date_of_birth,phone_number,blood_type,insurance_company,emergency_phone}=req.body;
     const updateUser=await pool.query("UPDATE users SET first_name=$1,last_name=$2,email=$3,password_user=$4,date_of_birth=$5,phone_number=$6,blood_type=$7,insurance_company=$8,emergency_phone=$9 WHERE userid=$10",
     [first_name,last_name,email,password_user,date_of_birth,phone_number,blood_type,insurance_company,emergency_phone,id]);
     res.json("User was updated!");
    }catch(err){
        console.error(err.message);
    }
});






app.listen(5000,()=>{

    console.log("server has started on port 5000");
});