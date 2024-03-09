import React, { useState, useEffect } from "react";
import TemporaryDrawer from "./../SideDrawer/Sidedrawer";
import "./Notes.css";
import ChatBotBtn from "../ChatBot/ChatBotBtn";
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
import {
  appwriteConfig,
  avatars,
  databases,
} from "../../appwrite/config";

const initialValue = {};

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(initialValue);
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
        title: "New Note",
        body: "New Note Body",
        user: user?.$id,
      });
      navigate(`/note/${note.$id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="notes-card">
        <div className="notes-card-title">
          <button onClick={handleNewNote}>Add new Node</button>
        </div>
      </div>
      <div>
        {notes.map((note) => (
          <Link to={`/note/${note.$id}`} key={note.$id}>
            <NotesCard note={note} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Notes;
