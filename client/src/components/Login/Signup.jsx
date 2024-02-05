import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserAccount,
  getCurrentUser,
  getSession,
  googleAuth,
  saveUser,
} from "../../appwrite/api.js";
import "./Login.css";
import { useCreateAccountMutation } from "../../reactQuery/queries.js";
import { account, avatars } from "../../appwrite/config.js";

function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const { mutateAsync: createUser, isPending: creatingUser } =
    useCreateAccountMutation();
  const switchToLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = await createUser(formData);

    if (!newUser) {
      console.log("something went wrong");
    }

    console.log(newUser);
    navigate("/");
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    await googleAuth();
  };

  useEffect(() => {
    const checkSession = async () => {
     const user = await getCurrentUser();
     console.log("user", user[0]);
      if (user[0]===0) {
        const avatar = user[2];
        const newUser = await saveUser({
          accountId: user[1].$id,
          email: user[1].email,
          imageurl: avatar,
          fullname: user[1].name,
        });
        console.log("new user", newUser);
        if(newUser){
          navigate("/");
        } else {
          console.log("something went wrong");
        }
      } else {
        navigate("/");
      }
    };
    checkSession();
  }, []);

  return (
    <div className="login-wrapper">
      <div>
        <form className="form" onChange={handleChange}>
          <div className="login-heading">
            <h1>Sign Up</h1>
          </div>

          <div className="flex-column">
            <label>Full Name </label>
          </div>

          <div className="inputForm">
            <input
              type="text"
              className="input"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className="flex-column">
            <label>Email </label>
          </div>

          <div className="inputForm">
            <input
              type="text"
              className="input"
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              className="input"
              id="password"
              name="password"
              placeholder="Enter your Password"
            />
          </div>

          <button
            className="button-submit"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <p className="p">
            Already have an account?
            <span className="span" onClick={switchToLogin}>
              Login
            </span>
          </p>

          <p className="p line">or Sign Up using</p>

          <div className="flex-row">
            <button className="btn google" onClick={handleGoogleAuth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2443"
                height="2500"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
