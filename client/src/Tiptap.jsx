import { useEffect, useState } from "react";
import Tiptap from "./components/editor/editor";
import { FetchAndParseNotes } from "./integration/server";

import React from "react";
import Loader from "./components/Loader/Loader";

const TiptapEditor = () => {
  const [dataNote, setDataNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await FetchAndParseNotes("65e60c40617c9e90eed6");
        setDataNote(fetchedData);
        console.log("====================================");
        console.log("app", dataNote);
        console.log("====================================");
      } catch (error) {
        console.error("Some error has occurred:", error);
      }
    };

    fetchData();
  }, []);

  if (!dataNote) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div>
        <Tiptap content={dataNote} />
      </div>
    </>
  );
};

export default TiptapEditor;
