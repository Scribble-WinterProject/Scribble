import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// import components
import Login from './components/Login/Login.jsx'
import Signup from './components/Login/Signup.jsx'
import Home from './components/Home/Home.jsx'

// import css
import "./App.css"


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App