import React, { useEffect, useState } from 'react'
import { getCurrentUser, getNotes, getPdfByNoteId, saveUser } from '../../appwrite/api'
import { avatars } from '../../appwrite/config';
import { NotePdfCard } from './NotePdfCard';
import { Link, useNavigate } from 'react-router-dom';


export const AllPdfs = () => {
    const [currUser, setcurrUser] = useState({})
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate()
    const [userNotesPdf,setUserNotesPdf]= useState([])
    
     useEffect(() => {
       const getUserNotes = async () => {
         try {
           const data = await getCurrentUser();
           const account = data[1];
           const user = data[3];
           if (!account) {
             navigate("/login");
             return;
           }
           if (!user) {
             const accountId = account.$id;
             const avatar = avatars.getInitials(account.name);
             const newUser = await saveUser({
               accountId: accountId,
               email: account.email,
               imageurl: avatar,
               fullname: account.name,
             });
             setcurrUser(newUser);
           }
           setcurrUser(user);
           const userNotes = await getNotes(user.$id);
           setNotes(userNotes.documents);

           if (notes.length > 0) {
             const notePdf = [];
             notes.map(async (note) => {
               const notePdfs = await getPdfByNoteId(note.$id);
               const obj = {
                 noteId: note.$id,
                 pdfs: notePdfs,
               };
               notePdf.push(obj);
             });
             setUserNotesPdf(notePdf);
             console.log("fds", userNotesPdf);
           }
           console.log("userNotesPdf", userNotesPdf.length); // Move this line here
         } catch (error) {
           console.log(error);
         }
       };
       getUserNotes();
     }, []);

   console.log("userNotesPdf",userNotesPdf.length);

  return (
    <div>
     {userNotesPdf.length>0 ? (
        <div>
          {userNotesPdf.map((notePdf)=> {
            return (
              <div>
                <h1>{notePdf.noteId}</h1>
                <div>
                  {notePdf.pdfs.map((pdf)=> {
                    return (
                      <NotePdfCard key={pdf.$id} pdf={pdf} />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <h1>No Notes</h1>
        </div>
      )}
    </div>
  );
}
