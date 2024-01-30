import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// import components
import Login from './components/Login/Login.jsx'

// import css
import "./App.css"


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path='/login' element={<Login />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App