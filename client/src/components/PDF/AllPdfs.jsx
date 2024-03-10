import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getNotes,
  getPdfByNoteId,
  saveUser,
} from "../../appwrite/api";
import { avatars } from "../../appwrite/config";
import { NotePdfCard } from "./NotePdfCard";
import { Link, useNavigate } from "react-router-dom";

export const AllPdfs = () => {
  const [currUser, setcurrUser] = useState({});
  const [notes, setNotes] = useState([]);
  const notePdf = [];

  const navigate = useNavigate();
  // const [userNotesPdf,setUserNotesPdf]= useState([])

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
        console.log("notes", notes);
      } catch (error) {
        console.log(error);
      }
    };
    getUserNotes();
  }, []);

  console.log("notepdf", notes);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.$id}>
          <h1>{note.title}</h1>
          <h1>{notes.pdf}</h1>
          <NotePdfCard note={note} />
        </div>
      ))}
    </div>
  );
};
