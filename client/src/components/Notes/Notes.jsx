import React from "react";

// import component
import TemporaryDrawer from "./../SideDrawer/Sidedrawer";

// import css
import "./Notes.css";
import ChatBotBtn from "../ChatBot/ChatBotBtn";
import TiptapEditor from "../../Tiptap";

function Notes() {
  return (
    <div className="notes-page-wrapper">
      <TemporaryDrawer />

      <div className="text-editor-wrapper">
        <div className="text-editor">
          <TiptapEditor className="TiptapEditor" />
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
