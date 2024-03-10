import React, { useEffect, useState } from 'react'
import { getCurrentUser, getNotes, getPdfByNoteId, saveUser } from '../../appwrite/api'
import { avatars } from '../../appwrite/config';
import { NotePdfCard } from './NotePdfCard';
import { Link } from 'react-router-dom';

export const AllPdfs = () => {
    const [currUser, setcurrUser] = useState({})
    const [notes, setNotes] = useState([]);
    const [notePdf,setNotePdf] = useState([{}])
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
        //   console.log(userNotes);
          setNotes(userNotes.documents);
          const pdf = await getPdfByNoteId("65edba50b8adafaa19ab")
          console.log(pdf);

        } catch (error) {
          console.log(error);
        }
      };
      getUserNotes();
    }, []);
    console.log(notes);
  return (
    <div>
      {/* {notes.map((note) => (
        <Link to={`note/pdf/${note.$id}`} key={note.$id}>
          <NotePdfCard note={note} />
        </Link>
      ))} */}
      hlo
    </div>
  );
}
