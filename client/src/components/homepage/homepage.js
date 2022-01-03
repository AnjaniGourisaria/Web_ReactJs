import React from 'react'
import "./homepage.css"
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom"


const Homepage = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

    const handleChange = e => {
        const { name,value } = e.target
        console.log(name,value)
        setUser({
            ...user,
            [name]: value
        })
    }
    axios.defaults.withCredentials = true
    const logout  = () => {
        axios.post("http://localhost:3001/logout")
        .then(res => alert(res.data.message))
    }
    const [loginStatus, setLoginStatus] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3001/").then((response) => {
        if (response.data.loggedIn == true) {
            console.log(response)
            setLoginStatus(response.data.user[0].email)
        }
        })
    }, [])

    const ChangeUppercase = e => { 
        
        function whatis() {
            const { name,value } = e.target
            document.getElementById("changes").value = name.toUpperCase();
        }
        window.onload = function () {
            whatis();
        }
       
    }
    return (
        <div className="homepage">
            <h6>{loginStatus}</h6>
            <h1>Homepage</h1>
            <input type="text" id="changes" name="name" value={user.name} placeholder="Enter Your Name"  onChange={ handleChange }></input>
            <div className="btn" onClick={ChangeUppercase}>ChangeUppercase</div>
            <div className="button" onClick={logout}>Logout</div>
        </div>
    )
}

export default Homepage
