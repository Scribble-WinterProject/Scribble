import React, { useState, useEffect } from 'react';
import '../../../public/style.css';
import './PdfCard.css';
import { useNavigate } from 'react-router';
import { deletePdfById } from '../../appwrite/api';

function PdfCard({ note }) {
  const [pdfs, setpdfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setpdfs(note.pdfs);
  }, [note.pdfs]);

  const handleNoteTitleClick = () => {
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
    <>

      <div className="pdfcard">
        <p
          className="cookieHeading"
          onClick={handleNoteTitleClick}
        >
          {note.title}
        </p>

        <div className="buttonContainer">
          {pdfs.map((pdf, index) => (
            <button
              className="pdfacceptButton"
              key={pdf.$id}
            >
              <p>PDF 1</p>

              <div className="view-delete-btn">

                <button className="view-btn" onClick={() => handlePdfClick(pdf.$id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="eye"><g data-name="Layer 2"><g data-name="eye"><rect width="24" height="24" opacity="0"></rect><path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"></path><path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path></g></g></svg>
                </button>

                <button className="delete-btn" onClick={() => handlePdfDelete(pdf.$id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>
                </button>

              </div>

            </button>
          ))}
        </div>
      </div>

    </>
  );
}

export default PdfCard;
