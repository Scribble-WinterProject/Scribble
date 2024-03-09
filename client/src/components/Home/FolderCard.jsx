import React from 'react'

// import css
import "./FolderCard.css"


function FolderCard(props) {
    return (
        <div>
            <div className="folder-card">
                <p className="cookieHeading">{ props.title}</p>
                <p className="cookieDescription">Created at: {props.createdAt }</p>

                <div className="buttonContainer">
                    <button className="acceptButton">Edit</button>
                    <button className="declineButton">Delete</button>
                </div>

            </div>
        </div>
    )
}

export default FolderCard