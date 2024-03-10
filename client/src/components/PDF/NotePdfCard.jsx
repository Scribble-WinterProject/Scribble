import React, { useEffect, useState } from 'react'
import { getPdfByNoteId } from '../../appwrite/api'

export const NotePdfCard = ({note}) => {
    const [pdfs, setpdfs] = useState([])
    console.log(note);
    useEffect(()=> {
       const getPdf = async()=> {
        console.log(note.$id);
        const pdfs = await getPdfByNoteId(note.$id)
        setpdfs(pdfs)
       }
       getPdf()
    },[])
  return (
    <div>
      {
        pdfs.map((pdf)=>(
          <div key={pdf.$id}>
            <h1>{pdf.title}</h1>
            <a href={pdf.fileUrl} target="_blank" rel="noreferrer">View</a>
          </div>
        ))
        
      }
    </div>
  )
}
