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

//delete a user
app.delete("/users/:id",async(req,res)=>{
   try{
     const{id}=req.params;
     const deleteUser=await pool.query("DELETE FROM users WHERE userid=$1",[id]);
     res.json("user was deleted!")
   }catch(err){
     console.log(err.message);
   }
});

//create a goal
app.post("/goals",async(req,res)=>{

  try{
    
     const{fitness,nutrition,exercise}=req.body;
     const newGoal=await pool.query("INSERT INTO goal (fitness,nutrition,exercise) VALUES($1,$2,$3) RETURNING * ",[fitness,nutrition,exercise]);
     res.json(newGoal.rows[0]);
 }catch(err){  
   console.error(err.message);
  }
 });

 //get all goals
app.get("/goals",async(raq,res)=>{
  try{
    const allGoal=await pool.query("SELECT * FROM goal");
    res.json(allGoal.rows)
  }catch(err){
      console.error(err.message)
  }
})

//get a goal
app.get("/goals/:id",async(req,res)=>{
  try{
      const{id}=req.params;
      const oneGoal =await pool.query("SELECT * FROM goal WHERE id=$1",[id]);
      res.json(oneGoal.rows[0]);
  }catch(err)
  {
         console.error(err.message);
  }
})

//update goal
app.put("/goals/:id", async(req,res)=>{
  try{
   const{id}=req.params;
   const{fitness,nutrition,exercise}=req.body;
   const updateGoal=await pool.query("UPDATE goal SET fitness=$1,nutrition=$2,exercise=$3 WHERE id=$4",
   [fitness,nutrition,exercise,id]);
   res.json("Goal was updated!");
  }catch(err){
      console.error(err.message);
  }
});

//delete a goal
app.delete("/goals/:id",async(req,res)=>{
  try{
    const{id}=req.params;
    const deleteGoal=await pool.query("DELETE FROM goal WHERE id=$1",[id]);
    res.json("goal was deleted!")
  }catch(err){
    console.log(err.message);
  }
});
 








app.listen(5000,()=>{

    console.log("server has started on port 5000");
});