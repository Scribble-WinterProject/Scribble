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
function Pdf() {
  const { id } = useParams();
  const [file, setfile] = useState(null);
  const handleChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setfile(file);
      } else {
        console.log(
          "Please select a PDF file of size less than or equal to 5MB."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteId = id;
    const upload = await pdfUpload({ file, noteId });
    console.log("upload", upload);
  };
  return (
    <div className="pdf-upload-wrapper">
      <div className="navbar-home">
        <div className="left-navbar-home">
          <TemporaryDrawerNote />
          <div className="title-navbar">
            <h1 className="scribble">Scribble</h1>
          </div>
        </div>

        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input className="search-input" type="search" placeholder="Search" />
        </div>
      </div>

      <div className="pdf-upload">
        <label className="custom-file-upload" htmlFor="file">
          <div className="text">
            <UploadFileIcon fontSize="large" />
            <span>Click to upload PDF</span>
          </div>
          <input type="file" id="file" onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Upload</button>
      </div>

      <div className="prev-pdfs">
        <div className="folder-title">
          <h1>Recent Folders: </h1>
          <div className="drop-down-see-more">
            <ArrowDropDownIcon />
          </div>
        </div>
        <Divider />
        <div className="card-wrapper">
          <PdfCard />
        </div>
      </div>
    </div>
  );
}

export default Pdf;
