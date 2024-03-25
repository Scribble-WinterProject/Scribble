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
import PdfCard from "./PdfCard";
import Loader from "../Loader/Loader";
import '../../../public/style.css'
import TemporaryDrawer from "../SideDrawer/Sidedrawer";

export const AllPdfs = () => {
  const [currUser, setcurrUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const notePdf = [];
  const navigate = useNavigate();

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
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };
    getUserNotes();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div>
     <div className="left-navbar-home">
          <TemporaryDrawer />
          <div className="title-navbar">
            <h1>Scribble</h1>
          </div>
        </div>
      {notes.map((note) => (
        <div key={note.$id}>
          <PdfCard note={note} />
        </div>
      ))}
    </div>
  );
};
