// import express, { application } from "express"
// import mysql from "mysql"
// import cors from 'cors'

var PORT = 3001;
//Session after login

const cors = require('cors')
const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
// session after login

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  method: ["GET","POST"],
  credentials:true,
})) //for cros means talking to No 'Access-Control-Allow-Origin' header is present on the requested resource. in axios
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    key:"userid",
    secret:"hello",
    resave: false,
    saveUninitialized:false,
    cookie:{
      expires: 60*60*24,
    },
  }))





const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'register'
});








app.post('/login', (req, res) => {
  const {email, password} = req.body
  // "select Email , Password from registration where Email='"+email+"' and password='"+password+"'";
  db.query("SElect email , password FROM registration WHERE email='"+email+"'and password='"+password+"'", function (err, result) {
    if(result.length === 0) {
      console.log('No User exists!')
      res.send({message:"Not Registered"})
    } else {
      console.log("Hi %s",email)
      req.session.user = result
      console.log(req.session.user)
      res.status(200).send({ message: 'Hi' });  
    }
  })
})


// app.get("/logout",(req,res)=> {
//   console.log(req.session.user)
//   if (req.session.user){
//     res.send({loggedIn: true,user: req.session.user});
//   }else{
//     res.send({loggedIn: false})
//   }
// })


app.post('/logout',  function (req, res, next)  {
  console.log(' hi logout')
  console.log(req.session)
  req.session.destroy()
  console.log(req.session)

  });



app.get('/', (req, res) =>{
  console.log(req.session.user)
  if (req.session.user){
    res.send({loggedIn: true,user: req.session.user});
  }else{
    res.send({loggedIn: false})
  }
})
app.get("/login",(req,res)=> {
  console.log(req.session.user)
  if (req.session.user){
    res.send({loggedIn: true,user: req.session.user});
  }else{
    res.send({loggedIn: false})
  }
})




app.post('/register', (req, res) => {
  const {name, email, password} = req.body

  db.query('SELECT email FROM registration WHERE email ="' +email + '"', function (err, result) {
    if (result.length === 0) {
       //new user logic
        db.query('INSERT INTO registration(name, email, password) VALUES("' + name + '", "' + email + '", "' + password + '")',
          [name, email, password]); 
          if (err) throw err;
          console.log(result);
          console.log("Success");
          res.status(200).send({ message: 'Success' }); 
    } else {
          res.status(200).send({ message: 'User already Registered' });           
    }
  });
});
  



app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT + '!');
  });



// app.post('/register', (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
// });

// app.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
// });

// app.post('/logout', (req, res) => {
    
// });
 
// app.listen(PORT, function(err){
//     if (err) console.log("Error in server setup")
//     console.log("Server listening on Port", PORT);
// })
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM tasks", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
// import cors form "cors"
// import mongoose form "mongoose"

// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

// mogoose.connect()