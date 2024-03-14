import React, { useEffect, useState } from "react";
import { getPdfByNoteId } from "../../appwrite/api";
import { useParams, useNavigate } from "react-router";
import PdfReader from "./PdfReader"; // Adjust the import path as necessary

export const NotePdfCard = ({note}) => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getPdf = async () => {
      const pdfs = await getPdfByNoteId(note.$id);
      setPdfs(pdfs);
    };
    getPdf();
  }, []);

console.log("pdfs are",pdfs);

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  return (
    <div className="">
      <h1 className="">{note.title}</h1>
      <div>
        {pdfs.map((pdf) => (
          <div key={pdf.$id} onClick={() => handlePdfClick(pdf.$id)}>
            <h3>{pdf.$id}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
