import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import "./Sidedrawer.css";
import { getNote, logOut } from "../../appwrite/api";
import { userLogOutMutation } from "../../reactQuery/queries";
import { NotePdfCard } from "../PDF/NotePdfCard";

export default function TemporaryDrawerNote() {
  const [note, setnote] = React.useState({})
  const { id } = useParams();



  React.useEffect(()=> {
    const getCurrNote = async () => {
      const note = await getNote(id)
      setnote(note)
    }
    getCurrNote()
  },[])

  const navigate = useNavigate();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { mutateAsync: logOutFunction } = userLogOutMutation();

  const handleLogOut = async (e) => {
    e.preventDefault();
    const res = await logOutFunction();
    if (res) {
      window.location.href = "/login";
    }
  };

  const handleClickNotes = () => {
    navigate("/home");
  };
  const handleClickHome = () => {
    navigate("/user/profile");
  };
  const handleClickLanding = () => {
    navigate("/");
  };
  const handleClickPdfs = () => {
    navigate("/pdfs");
  };

  const list = () => (
    <div className="side-bar">
      <div className="title" onClick={handleClickLanding}>
        <h1 className="scribble">Scribble</h1>
      </div>

      <div className="side-bar-options">
        <div className="upper-options">
          <ul>
            <li onClick={handleClickHome}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 512 512"
                id="profile"
              >
                <g data-name="<Group>">
                  <path
                    fill="#ed664c"
                    d="M389.25 403.71v24.83a218.018 218.018 0 0 1-266.5 0V403.71a133.25 133.25 0 0 1 266.5 0zM304.09 124.82a67.514 67.514 0 1 1-47.64-19.67A67.064 67.064 0 0 1 304.09 124.82z"
                  ></path>
                  <path
                    fill="#fdc75b"
                    d="M256,38c120.4,0,218,97.6,218,218a217.579,217.579,0,0,1-84.75,172.54V403.71a133.25,133.25,0,0,0-266.5,0v24.83A217.579,217.579,0,0,1,38,256C38,135.6,135.6,38,256,38Zm67.76,134.46a67.158,67.158,0,1,0-19.67,47.63A67.064,67.064,0,0,0,323.76,172.46Z"
                  ></path>
                  <path d="M256,28A228.09,228.09,0,0,0,52.1,358.141a230.034,230.034,0,0,0,64.528,78.309,228.02,228.02,0,0,0,278.735,0A230.007,230.007,0,0,0,459.9,358.141,228.045,228.045,0,0,0,256,28ZM132.75,423.557V403.71a123.25,123.25,0,0,1,246.5,0v19.847a208.024,208.024,0,0,1-246.5,0Zm266.5-16.749v-3.1c0-78.988-64.262-143.25-143.25-143.25A143.257,143.257,0,0,0,112.75,403.71v3.1A206.439,206.439,0,0,1,48,256C48,141.309,141.309,48,256,48s208,93.309,208,208A206.444,206.444,0,0,1,399.25,406.808Z"></path>
                  <path d="M256.45,95.15a77.158,77.158,0,1,0,54.713,22.6A76.787,76.787,0,0,0,256.45,95.15Zm40.566,117.872a57.513,57.513,0,1,1,16.745-40.562A56.931,56.931,0,0,1,297.016,213.022Z"></path>
                </g>
              </svg>
              Profile
            </li>

            <li onClick={handleClickNotes}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="note"
              >
                <g data-name="Layer 2">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="#ff5b13"
                    d="M1 12C1 4 4 1 12 1s11 3 11 11-3 11-11 11S1 20 1 12"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M16.2 6H8a2 2 0 0 0-1.83 1.17A1.2 1.2 0 0 1 6 9.56v1.24a1.24 1.24 0 0 1 .85.35 1.2 1.2 0 0 1-.85 2v1.24a1.2 1.2 0 0 1 .15 2.39A2 2 0 0 0 8 18h4.95A13.69 13.69 0 0 1 18 12.93V7.8A1.81 1.81 0 0 0 16.2 6Z"
                  ></path>
                  <path
                    fill="#ff4000"
                    fill-rule="evenodd"
                    d="M12.93 18v-3.09a2 2 0 0 1 2-2H18Z"
                  ></path>
                </g>
              </svg>
              My Note
            </li>

            <li onClick={handleClickPdfs}>
              <svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  enableBackground="new 0 0 32 32"
  overflow="visible"
  viewBox="0 0 32 32"
  id="pdf"
>

                <switch>
                  <g>
                    <path
                      fill="#f42727"
                      d="M28,29V3c0-1.7-1.3-3-3-3H3c1.7,0,3,1.3,3,3v26c0,1.7,1.3,3,3,3
							h22C29.3,32,28,30.7,28,29z"
                    ></path>
                    <path
                      fill="#e20c0c"
                      d="M3 0C1.3 0 0 1.3 0 3v3h6V3C6 1.3 4.7 0 3 0zM6.9 31.1C7.4 31.7 8.2 32 9 32h3v-6L6.9 31.1z"
                    ></path>
                    <path
                      fill="#bf0202"
                      d="M12,26v3c0,1.7-1.3,3-3,3h20c1.7,0,3-1.3,3-3v-3H12z"
                    ></path>
                    <path
                      fill="#e6e6e6"
                      d="M12.4 14.8c-.1 0-.2 0-.2 0-.1 0-.2 0-.2 0v1.9h-.9v-4.9h1.4c.2 0 .4 0 .6 0 .2 0 .3.1.5.1.3.1.6.3.8.5.2.2.3.5.3.9 0 .2 0 .4-.1.6-.1.2-.2.3-.4.5s-.4.2-.7.3C13.1 14.8 12.8 14.8 12.4 14.8zM12 14c.1 0 .1 0 .2 0 .1 0 .2 0 .2 0 .2 0 .4 0 .6-.1s.3-.1.4-.2.2-.2.2-.3c0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4-.1-.1-.2-.2-.3-.2-.1 0-.2-.1-.3-.1-.1 0-.3 0-.5 0H12V14zM15.6 16.7v-4.9h1.3c.1 0 .2 0 .4 0 .1 0 .2 0 .3 0 .1 0 .2 0 .3.1s.2 0 .3.1c.3.1.5.2.7.3.2.1.4.3.5.5.1.2.2.4.3.6.1.2.1.5.1.8 0 .3 0 .5-.1.7-.1.2-.1.4-.3.6-.1.2-.3.4-.5.5-.2.1-.4.3-.6.4-.2.1-.4.1-.7.2s-.6.1-.9.1H15.6zM16.8 16c.5 0 .9-.1 1.2-.2.3-.1.5-.3.6-.6.1-.2.2-.6.2-.9 0-.2 0-.4-.1-.5s-.1-.3-.2-.4c-.1-.1-.2-.2-.3-.3-.1-.1-.3-.2-.4-.2-.1-.1-.3-.1-.5-.1-.2 0-.4 0-.6 0h-.4V16H16.8zM21.6 16.7h-.9v-4.9h3.1v.8h-2.2v1.3h1.9v.8h-1.9V16.7z"
                    ></path>
                  </g>
                </switch>
              </svg>
              PDF's
            </li>
          </ul>
        </div>
        <div className="pdfs">
          <NotePdfCard id={id}/>
        </div>



        <div className="lower-options">
          <ul>
            <li onClick={handleLogOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="shutdown"
              >
                <path
                  fill="#FFF"
                  d="M32 3C15.984 3 3 15.984 3 32s12.984 29 29 29 29-12.984 29-29S48.016 3 32 3zm-2 9.48a1.98 1.98 0 0 1 1.98-1.98h.04A1.98 1.98 0 0 1 34 12.48v12.04a1.98 1.98 0 0 1-1.98 1.98h-.04A1.98 1.98 0 0 1 30 24.52V12.48zM32 51c-10.201 0-18.5-8.299-18.5-18.5 0-8.099 5.239-14.982 12.5-17.482v7.69c-3.292 2.025-5.5 5.651-5.5 9.792C20.5 38.841 25.659 44 32 44s11.5-5.159 11.5-11.5c0-4.141-2.208-7.767-5.5-9.792v-7.69c7.261 2.5 12.5 9.383 12.5 17.482C50.5 42.701 42.201 51 32 51z"
                ></path>
                <path
                  fill="#F15439"
                  d="M38 15.018v7.69c3.292 2.025 5.5 5.651 5.5 9.792C43.5 38.841 38.341 44 32 44s-11.5-5.159-11.5-11.5c0-4.141 2.208-7.767 5.5-9.792v-7.69c-7.261 2.5-12.5 9.383-12.5 17.482C13.5 42.701 21.799 51 32 51s18.5-8.299 18.5-18.5c0-8.099-5.239-14.982-12.5-17.482z"
                ></path>
                <path
                  fill="#399BB9"
                  d="M31.98 26.5h.04A1.98 1.98 0 0 0 34 24.52V12.48a1.98 1.98 0 0 0-1.98-1.98h-.04A1.98 1.98 0 0 0 30 12.48v12.04a1.98 1.98 0 0 0 1.98 1.98z"
                ></path>
                <path d="M32 62C15.458 62 2 48.542 2 32S15.458 2 32 2s30 13.458 30 30-13.458 30-30 30zm0-58C16.561 4 4 16.561 4 32s12.561 28 28 28 28-12.561 28-28S47.439 4 32 4z"></path>
                <path d="M32 52c-10.752 0-19.5-8.748-19.5-19.5 0-8.31 5.295-15.715 13.175-18.427L27 13.617v9.649l-.477.293c-3.146 1.936-5.023 5.277-5.023 8.94C21.5 38.29 26.21 43 32 43s10.5-4.71 10.5-10.5c0-3.663-1.878-7.005-5.023-8.94L37 23.267v-9.649l1.325.456C46.205 16.785 51.5 24.19 51.5 32.5 51.5 43.252 42.752 52 32 52zm-7-35.52c-6.335 2.77-10.5 9.039-10.5 16.02C14.5 42.149 22.351 50 32 50s17.5-7.851 17.5-17.5c0-6.98-4.165-13.25-10.5-16.02v5.683c3.455 2.339 5.5 6.162 5.5 10.337C44.5 39.393 38.893 45 32 45s-12.5-5.607-12.5-12.5c0-4.175 2.045-7.998 5.5-10.337V16.48z"></path>
                <path d="M32.02 27.5h-.04A2.983 2.983 0 0 1 29 24.52V12.48a2.983 2.983 0 0 1 2.98-2.98c1.683 0 3.02 1.337 3.02 2.98v12.04a2.984 2.984 0 0 1-2.98 2.98zm0-16c-.58 0-1.02.439-1.02.98v12.04c0 .541.439.98.98.98h.039a.98.98 0 0 0 .98-.98V12.48a.979.979 0 0 0-.979-.98z"></path>
              </svg>{" "}
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  const anchor = "left"; // Set anchor to 'left' only

  return (
    <div className="">
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            baseProfile="tiny"
            version="1.2"
            viewBox="0 0 24 24"
            id="menu"
          >
            <path d="M8 3H6a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 3 6v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 6 11h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 11 8V6a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 8 3zm10 0h-2a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 13 6v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 16 11h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 21 8V6a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 18 3zM8 13H6a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 3 16v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 6 21h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 11 18v-2a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 8 13zm10 0h-2a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 13 16v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 16 21h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 21 18v-2a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 18 13z"></path>
          </svg>
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
