import React, { useState, useEffect } from "react";

// import component
import TemporaryDrawer from "../SideDrawer/Sidedrawer";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// import css
import "./Home.css";
import FolderCard from "./FolderCard";
import ChatBotBtn from "../ChatBot/ChatBotBtn";
import TiptapEditor from "../../Tiptap";
import NotesCard from "../Home/NotesCard";
import {
  saveNote,
  getNotes,
  getCurrentUser,
  saveUser,
} from "../../appwrite/api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { userSaveNoteMutation } from "../../reactQuery/queries";

function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { mutateAsync: createNote } = userSaveNoteMutation();

  useEffect(() => {
    const getUserNotes = async () => {
      try {
        const data = await getCurrentUser();
        const user = data[3];
        if (!user) {
          navigate("/login"); // Redirect to login page if user is not found
          return;
        }
        setUser(user); // Update user state
        const userNotes = await getNotes(user.$id);
        setNotes(userNotes.documents);
      } catch (error) {
        console.log(error);
      }
    };
    getUserNotes();
  }, []);

  const handleNewNote = async () => {
    try {
      const note = await createNote({
        user: user?.$id,
      });
      navigate(`/notes/${note.$id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar-home">
        <div className="left-navbar-home">
          <TemporaryDrawer />
          <div className="title-navbar">
            <h1>Scribble</h1>
          </div>
        </div>

        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input className="search-input" type="search" placeholder="Search" />
        </div>
      </div>


//       <div className="home-folder-notes">
//         <div className="home-folder">
//           <div className="folder-title">
//             <h1>Recent Folders: </h1>
//             <div className="drop-down-see-more">
//               <ArrowDropDownIcon />
//             </div>
//           </div>
//           <Divider />
//           <div className="card-wrapper">
//             <FolderCard />
//             <FolderCard />
//             <FolderCard />
//           </div>
//         </div>

//         <div className="home-notes">
//           <div className="folder-title">
//             <h1>Recent Notes: </h1>
//             <div className="drop-down-see-more">
//               <ArrowDropDownIcon />
//             </div>
//           </div>
//           <div className="notes-card" onClick={handleNewNote}>
//             <div className="notes-card-title">
//               <h1>Add New</h1>

//                 <div className="home-folder">
//                     <div className="folder-title">
//                         <h1>Recent Folders: </h1>
//                         <div className="drop-down-see-more">
//                             <ArrowDropDownIcon />
//                         </div>
//                     </div>
//                     <Divider />
//                     <div className="card-wrapper">
//                         <FolderCard title="Hello Everyone" createdAt="26/10/2024" />
//                         <FolderCard title="Hello Everyone" createdAt="26/10/2024" />
//                         <FolderCard title="Hello Everyone" createdAt="26/10/2024" />
//                     </div>
//                 </div>

//                 <div className="home-notes">
//                     <div className="folder-title">
//                         <h1>Recent Notes: </h1>
//                         <div className="drop-down-see-more">
//                             <ArrowDropDownIcon />
//                         </div>
//                     </div>
//                     <Divider />
//                     <div className="card-wrapper">
//                         <NotesCard title="Hello Everyone" description="Hello Everyone , Good morning" createdAt="26/10/2024" />
//                         <NotesCard title="Hello Everyone" description="Hello Everyone , Good morning" createdAt="26/10/2024" />
//                         <NotesCard title="Hello Everyone" description="Hello Everyone , Good morning" createdAt="26/10/2024" />
//                     </div>
//                 </div>

//             </div>
//           </div>
//           <div className="card-wrapper">
//             {notes.map((note) => (
//               <Link to={`/notes/${note.$id}`}>
//                 <NotesCard key={note.$id} note={note} />
//               </Link>
//             ))}
//           </div>
//           <Divider />
//           <div className="card-wrapper"></div>
//         </div>
//       </div>
    </div>
  );
}

export default Home;
