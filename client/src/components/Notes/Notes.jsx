import React, { useEffect, useState } from "react";

// import component
import TemporaryDrawer from "./../SideDrawer/Sidedrawer";

// import css
import "./Notes.css";
import ChatBot from "../ChatBot/ChatBot";
import TiptapEditor from "../../Tiptap";
import ChatBotBtn from "../ChatBot/ChatBotBtn";
import { getNote } from "../../appwrite/api";
import { useParams } from "react-router";
import Title from "./Title";
import TemporaryDrawerNote from "../SideDrawer/SidedrawerNote";

function Notes() {
  const { id } = useParams();
  const [note, setnote] = useState("");
  useEffect(() => {
    const noteData = async () => {
      const note = await getNote(id);
      if (!note) {
        throw new Error("error while getting note");
      }
      console.log(note);
      setnote(note);
    };
    noteData();
  }, []);
  return (
    <div className="notes-page-wrapper">
      <h1>{note.title}</h1>
      <div className="navbar-home">
        <div className="left-navbar-home">
          <TemporaryDrawerNote id={id} />
          <div className="title-navbar-notes">
            <h1 className="scribble">Scribble</h1>
            <Title />
          </div>
        </div>
      </div>

      <div className="text-editor-wrapper">
        <div className="text-editor">
          <TiptapEditor className="TiptapEditor" id={id} />
        </div>

        <div className="chat-bot-btn">
          <span className="tbn">
            <ChatBotBtn />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Notes;
