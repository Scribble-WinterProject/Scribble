import React from "react";

import "./NotesCard.css";
import { deleteNote } from "../../appwrite/api";
import { Link, useNavigate } from "react-router-dom";


function NotesCard({ title, id }) {
  const navigate = useNavigate();
  const handleNoteDelete = async()=> {
    try {
      await deleteNote(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const handleNoteClick = ()=>{
    navigate(`/notes/${id}`)
  }
  return (
    <div>
      <div className="notes-card">
        <div className="notes-card-title">
          <h1>{title}</h1>
        </div>
        <div className="notes-card-body">
          {/* <p>{body}</p> */}

          {/* <p className="cookieHeading">{title}</p> */}
          {/* <p className="cookieDescription">{body}</p> */}
          {/* <p className="cookieDescription">Created at: {props.createdAt}</p> */}

          <div className="buttonContainer">
            <button className="acceptButton"  onClick={handleNoteClick}>Edit</button>
            <button className="declineButton" onClick={handleNoteDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
