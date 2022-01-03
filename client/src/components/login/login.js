import React, { useState, useEffect } from "react"
import "./login.css"
import axios from 'axios'
import {useHistory} from "react-router-dom"

const Login = () => {
    const history= useHistory()
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const handleChange = e => {
        const { name,value } = e.target
        //console.log(name,value)
        setUser({
            ...user,
            [name]: value
        })

    }
    const [loginStatus, setLoginStatus] = useState("");
    if(loginStatus){
        console.log("anj hello")
        // history.push("/");
    }else{
        console.log("")
    }
    console.log(loginStatus)
    axios.defaults.withCredentials = true
    const login  = () => {
        const {email,password } = user
        if(email && password) {
            axios.post("http://localhost:3001/login",user)
            .then(res => alert(res.data.message))
        }else {
            alert("Please fill form correctly ")
        }
    }
    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn == true) {
            console.log(response)
            setLoginStatus(response.data.user[0].email)
            
        }
        })
    }, [])
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="email" name="email" value={user.email} placeholder="Enter Your Email"  onChange={ handleChange } ></input>
            <input type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={ handleChange } ></input>
            <div className="button"onClick={login}>Login</div>
            <div>{loginStatus}</div>
            <div className="button" onClick={() => history.push("/register")} >Register</div>
        </div>
    )
}

export default Login
