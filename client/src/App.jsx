import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import components
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Login/Signup.jsx";
import Home from "./components/Home/Home.jsx";
import Notes from "../src/components/Notes/Notes.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import Pdf from "./components/PDF/Pdf.jsx";

// import css




import { NotePage } from './components/notepage/NotePage.jsx';

// import { Home } from './reactQuery/pages/Home/Home.jsx';

import "./App.css";


import { ForgetPassword } from "./components/Login/ForgetPassword.jsx";
import TiptapEditor from "./Tiptap.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/notes/:id" element={<Notes />} />
          <Route path="/notes/tiptap" element={<TiptapEditor />} />
          <Route path="/pdfupload/:id" element={<Pdf />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
