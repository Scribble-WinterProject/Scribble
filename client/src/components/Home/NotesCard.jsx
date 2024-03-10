import React from "react";

import "./NotesCard.css";

function NotesCard({ title, body }) {
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
          {/* <p>{body}</p> */}

          {/* <p className="cookieHeading">{title}</p> */}
          {/* <p className="cookieDescription">{body}</p> */}
          {/* <p className="cookieDescription">Created at: {props.createdAt}</p> */}

          <div className="buttonContainer">
            <button className="acceptButton">Edit</button>
            <button className="declineButton">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
