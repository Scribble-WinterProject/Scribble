import React, { useState } from "react";
import { getCurrentUser, pdfUpload } from "../../appwrite/api";

export const NotePage = () => {
  const [file, setfile] = useState(null);
  const handleChange = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const file = event.target.files[0]; // Use event.target.files instead of event.target.file
    console.log(file);
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setfile(file);
      } else {
        console.log(
          "Please select a PDF file of size less than or equal to 5MB.",
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteId = "65eca05a5639e6561692";
    const upload = await pdfUpload({ file, noteId });
    console.log("upload", upload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleChange} />{" "}
        {/* Add onChange handler */}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
