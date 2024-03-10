import React, { useEffect, useState } from "react";
import { getPdfByNoteId } from "../../appwrite/api";
import { useParams, useNavigate } from "react-router";
import PdfReader from "./PdfReader"; // Adjust the import path as necessary

export const NotePdfCard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getPdf = async () => {
      const pdfs = await getPdfByNoteId(id);
      setPdfs(pdfs);
    };
    getPdf();
  }, [id]);

  const handlePdfClick = (url) => {
    navigate(`/pdf-viewer/${encodeURIComponent(url)}`);
  };

  return (
    <div>
      {pdfs.map((pdf) => (
        <div key={pdf.$id}>
          <h1>{pdf.title}</h1>
          <button onClick={() => handlePdfClick(pdf.fileUrl)}>View</button>
        </div>
      ))}
      {selectedPdfUrl && <PdfReader fileUrl={selectedPdfUrl} />}
    </div>
  );
};
