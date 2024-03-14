import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { getPdfById } from "../../appwrite/api";

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { id } = useParams();

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const pdf = await getPdfById(id);
        setPdfUrl(pdf.fileUrl);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, [id]);

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
      {pdfUrl ? (
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      ) : (
        <div>Loading PDF...</div>
      )}
    </Worker>
  );
};

export default PdfViewer;
