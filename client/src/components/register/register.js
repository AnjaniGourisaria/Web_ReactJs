import React, { useState } from "react"
import "./register.css"
import axios from 'axios'
import { useHistory } from "react-router-dom"
const Register = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })
    const handleChange = e => {
        const { name,value } = e.target
        //console.log(name,value)
        setUser({
            ...user,
            [name]: value
        })

    }
    const register  = () => {
        const { name,email,password ,reEnterPassword } = user
        
        if(name && email && password && (password == reEnterPassword) && (password.length > 7 && reEnterPassword.length > 7)) {
            axios.post("http://localhost:3001/register",user)
            .then(res => alert(res.data.message))
        }else {
            alert("Please fill form correctly ")
        }
    }

    return (
        <div className="register">
        {/* {console.log("User",user)} */}
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Enter Your Name"  onChange={ handleChange }></input>
        <input type="email" name="email" value={user.email} placeholder="Enter Your Email" onChange={ handleChange } ></input>
        <input type="password" name="password" value={user.password} placeholder="Enter Your Password"  onChange={ handleChange }></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Enter Your Re-Password" onChange={ handleChange } ></input>
        <div className="button" onClick={ register } >Register</div>
        <div>Or</div>
        <div className="button" onClick={() => history.push("/login")} >Login</div>
    </div>
    )
}

export default Register
