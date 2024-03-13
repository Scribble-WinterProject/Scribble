import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./NotesCard.css";
import { deleteNote } from "../../appwrite/api";

function NotesCard({ title, id }) {
  const handleDelete = async () => {
    await deleteNote(id);
    console.log("====================================");
    console.log("id hai", id);
    console.log("====================================");
    console.log("Note deleted");
    window.location.reload(); // Reload the screen after deleting a note
  };

  const handleDeleteConfirmation = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      toast.promise(await handleDelete(), {
        loading: "Deleting note...",
        success: "Note deleted",
        error: "Failed to delete note",
      });
    }
  };

  console.log("====================================");
  console.log(title);
  console.log("====================================");
  return (
    <div>
      <div className="notes-card">
        <div className="notes-card-title">
          <h1>{title}</h1>
        </div>
        <div className="notes-card-body">
          <div className="buttonContainer">
            <Link to={`/notes/${id}`}>
              <button className="acceptButton">Edit</button>
            </Link>
            <button
              className="declineButton"
              onClick={handleDeleteConfirmation}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
