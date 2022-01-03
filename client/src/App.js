import './App.css';
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

// import loginStatus from '/components/login/login'


function App() {
  const [loginStatus, setLoginStatus] = useState("");
    console.log(loginStatus)
    useEffect(() => {
        axios.get("http://localhost:3001/").then((response) => {
        if (response.data.loggedIn == true) {
            console.log(response)
            setLoginStatus(response.data.user[0].email)   
        }
        })
    }, [])
    console.log(loginStatus)
  return <div className="App">   
  <Router>
    <Switch>  
      <Route exact path="/"><Homepage/></Route>
      <Route path="/register">  <Register/></Route>
      <Route path="/login"><Login/></Route>
    </Switch>
    </Router>
  </div>
}

export default App;

// const [loginStatus, setLoginStatus] = useState("");

//     console.log(loginStatus)
//     useEffect(() => {
//         axios.get("http://localhost:3001/login").then((response) => {
//         if (response.data.loggedIn == true) {
//             console.log(response)
//             setLoginStatus(response.data.user[0].email)
            
//         }
//         })
//     }, [])