import React, { useEffect, useState } from 'react'
import { getPdfByNoteId } from '../../appwrite/api'

export const NotePdfCard = ({note}) => {
    const [pdfs, setpdfs] = useState([])
    console.log(note);
    useEffect(()=> {
       const getPdf = async()=> {
        console.log(note.$id);
        const pdfs = await getPdfByNoteId(note.$id)
        console.log(pdfs);
       }
       getPdf()
    },[])
    console.log(pdfs);
  return (
    <div>NotePdfCard</div>
  )
}
