import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import { CiImageOn } from "react-icons/ci";

function FileUpload({ fieldChange, mediiaUrl }) {
  const [fileUrl, setfileUrl] = useState(mediiaUrl);
  const [file, setfile] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setfile(acceptedFiles);
      fieldChange(acceptedFiles);
      setfileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:{
        pdf: 'application/pdf',
    },
  });

  return (
    <div
      {...getRootProps()}
      className="bg-gray-600/30 rounded-lg cursor-pointer h-96 relative overflow-hidden"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="">
            <img
              src={fileUrl}
              alt=""
              className="object-contain w-full h-full absolute p-4"
            />
          </div>
        </>
      ) : (
        <div className="flex items-center flex-col gap-2 mt-24">
          {/* <CiImageOn className="opacity-55 h-24 w-24" /> */}
          <h1>Drag here</h1>
          <button className="p-3 bg-black rounded-lg">
            Select photos from device
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
