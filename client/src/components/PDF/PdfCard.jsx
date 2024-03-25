import React, { useState, useEffect } from 'react';
import '../../../public/style.css';
import { useNavigate } from 'react-router';

function PdfCard({ note }) {
    const [pdfs, setpdfs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setpdfs(note.pdfs);
    }, [note.pdfs]);

    const handleNoteTitleClick = ()=> {
        navigate(`/notes/${note.$id}`);
    }

    const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

    return (
        <div className='pdfCard'>
            <p className='pdfCardName' onClick={handleNoteTitleClick} >{note.title}</p>
            <div>
      {pdfs.map((pdf, index) => (
        <div key={pdf.$id} onClick={() => handlePdfClick(pdf.$id)} className="pdfOnAllPdfs">
          <p>PDF {index + 1}</p>
        </div>
      ))}
            </div>
        </div>
    );
}

export default PdfCard;
