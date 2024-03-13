import React, { useState } from "react";
import TemporaryDrawer from "./../SideDrawer/Sidedrawer";

import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import "./Pdf.css";
import PdfCard from "./PdfCard";
import { pdfUpload } from "../../appwrite/api";
import { useParams } from "react-router-dom";
import TemporaryDrawerNote from "../SideDrawer/SidedrawerNote";
import Load from "../Loader/Load";

function Pdf() {
  const { id } = useParams();
  const [file, setfile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setfile(file);
        setIsLoading(true); // Set isLoading to true when file is selected
        // Call handleSubmit directly after setting the file state
        await handleSubmit(file);
      } else {
        console.log(
          "Please select a PDF file of size less than or equal to 5MB."
        );
      }
    }
  };

  const handleSubmit = async (file) => {
    const noteId = id;
    const upload = await pdfUpload({ file, noteId });
    console.log("upload", upload);
    if (upload) {
      // Show confirmation message
      window.alert("File uploaded successfully!");
      // Reload the page
      window.location.reload();
      // Trigger opening of the sidebar
      // Code to trigger opening of the sidebar goes here
    }
  };

  return (
    <div className="pdf-upload-wrapper">
      <div className="pdf-upload">
        <label className="custom-file-upload" htmlFor="file">
          <div className="text">
            {isLoading ? (
              <div>Uploading...</div>
            ) : (
              <>
                <UploadFileIcon fontSize="large" />
              </>
            )}
          </div>
          <input type="file" id="file" onChange={handleChange} />
        </label>
      </div>
    </div>
  );
}

export default Pdf;
