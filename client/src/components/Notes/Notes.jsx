import React, { useState,useEffect } from 'react'


// import component 
import TemporaryDrawer from './../SideDrawer/Sidedrawer'


// import css
import "./Notes.css"
import ChatBotBtn from '../ChatBot/ChatBotBtn'
import NotesCard from '../Home/NotesCard'
import {  saveNote,getNotes, getCurrentUser } from '../../appwrite/api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const initialValue = {}

function Notes() {
    const [notes,setNotes] = useState([])
    const navigate = useNavigate();
    const [user, setUser] = useState(initialValue);


    const handleNewNote = async() => {
        try {
            const note = await saveNote({title: "New Note", body: "New Note Body",user: user?.$id})
            navigate(`/note/${note.$id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
       const getUserNotes = async () => {
         try {
          const data = await getCurrentUser();
          const user = data[3]
          if(!user) navigate("/login")
          setUser(user);
           const userNotes = await getNotes(user.$id);
           setNotes(userNotes.documents);
           console.log("notes", notes);
         } catch (error) {
           console.log(error);
         }
       };
       getUserNotes()
    }, [])
    

    console.log(notes);

   
    return (
      // <div className='notes-page-wrapper'>
      //     <div className="navbar-home">
      //         <div className='left-navbar-home'>
      //             <TemporaryDrawer />
      //             <div className="title-navbar">
      //                 <h1>Scribble</h1>
      //             </div>
      //         </div>

      //         <div class="group">
      //             <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
      //                 <g>
      //                     <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
      //                 </g>
      //             </svg>
      //             <input class="search-input" type="search" placeholder="Search" />
      //         </div>
      //     </div>

      //     <div className="text-editor-wrapper">
      //         <div className="text-editor">
      //             Text Editor Area
      //         </div>

      //         <div className="chat-bot-btn">
      //             <span className="tbn">
      //                 <ChatBotBtn />
      //             </span>
      //         </div>
      //     </div>
      // </div>
      <div className="">
        <div className="notes-card">
          <div className="notes-card-title">
            <button onClick={handleNewNote}>Add new Node</button>
          </div>
        </div>
        <div>
          {notes.map((note) => (
            <Link to={`/note/${note.$id}`} key={note.$id}>
              {" "}
              <NotesCard note={note} />
            </Link>
          ))}
        </div>
      </div>
    );
}

export default Notes