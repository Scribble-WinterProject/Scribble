import React, { useEffect, useState } from "react";
import { getPdfByNoteId, pdfUpload } from "../../appwrite/api";
import { useParams, useNavigate } from "react-router";
import PdfReader from "./PdfReader"; // Adjust the import path as necessary
import "../../../public/style.css"
export const NotePdfCard = ({id}) => {
  console.log(id,"njfdskbfjdkbgjfkvbfk");
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getPdf = async () => {
      const pdfs = await getPdfByNoteId(id);
      setPdfs(pdfs);
    };
    getPdf();
  }, []);

console.log("pdfs are",pdfs);

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };
  const [file, setfile] = useState(null);

  const handleSubmit = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setfile(file);
      } else {
        alert(
          "Please select a PDF file of size less than or equal to 5MB."
        );
      }
    }
    const noteId = id;
    const upload = await pdfUpload({ file, noteId });
    window.location.reload();
    console.log("upload", upload);
  };

  return (
  <div className="pdfContainer">
    <label htmlFor="file" className="addPdfButton">
      ADD PDF
      <input type="file" id="file" onChange={handleSubmit} style={{ display: "none" }} />
    </label>

    <div>
      {pdfs.map((pdf, index) => (
        <div key={pdf.$id} onClick={() => handlePdfClick(pdf.$id)} className="pdfOnNote">
          <p>PDF {index + 1}</p>
        </div>
      ))}
    </div>
  </div>
);

};
