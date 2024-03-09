import React from 'react'


import "./NotesCard.css"

function NotesCard(props) {
    return (
        <div>
            <div className="notes-card">
                <p className="cookieHeading">{props.title}</p>
                <p className="cookieDescription">{props.description}</p>
                <p className="cookieDescription">Created at: {props.createdAt}</p>

                <div className="buttonContainer">
                    <button className="acceptButton">Edit</button>
                    <button className="declineButton">Delete</button>
                </div>


            </div>
        </div>
    )
}

export default NotesCard