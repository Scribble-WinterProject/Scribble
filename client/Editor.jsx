
import { Editor } from "novel";
import { useState } from "react";
import { saveNote } from "./src/appwrite/api";

export default function App() {
  const [text,setText] = useState('')

  const handleUpdate = (editor) => {
    setText(editor.getJSON());
    console.log(editor.getJSON());
    const savedNote = saveNote(editor.getJSON());
    console.log(savedNote);
  }

  
  return (
    <div>
      <Editor defaultValue={{
        type: "doc",
        content:[text],
      }}
      onDebouncedUpdate={handleUpdate}/>
    </div>
  );
}