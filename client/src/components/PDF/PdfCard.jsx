import React, { useState, useEffect } from 'react';
import '../../../public/style.css';
import { useNavigate } from 'react-router';
import { deletePdfById } from '../../appwrite/api';

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

  const handlePdfDelete = async (id) => {
    try {
      await deletePdfById(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div className='pdfCard'>
            <p className='pdfCardName' onClick={handleNoteTitleClick} >{note.title}</p>
            <div>
      {pdfs.map((pdf, index) => (
        <div key={pdf.$id}  className="pdfOnAllPdfs">
          <p className='pdfName'>PDF {index + 1}</p>
          <div className='pdfButtons'>
            <button onClick={() => handlePdfClick(pdf.$id)} className='pdfButton'>View</button>
            <button onClick={()=> handlePdfDelete(pdf.$id)} className='pdfButton'>Delete</button>
          </div>
        </div>
      ))}
            </div>
        </div>
    );
}

export default PdfCard;
