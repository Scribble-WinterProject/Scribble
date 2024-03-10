import React from 'react'

function NotesCard({note}) {
    return (
        <div>
            <div className="notes-card">
                <div className="notes-card-title">
                    <h1>{note.title}</h1>
                </div>
            </div>
        </div>
    )
}

export default NotesCard