import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import { useEmailVerificationMutation, userSignInMutation } from "../../reactQuery/queries";

// import css
import "./Login.css";

const ForgetPasswordEmail = () => {
    const navigate = useNavigate();
    const [email, ssetEmail] = useState("");
    const { mutateAsync: emailVerification} = useEmailVerificationMutation();

    const handleClick = async(e) => {
        e.preventDefault();
        const res = await emailVerification(email)
        alert("Email sent to your email address")
    }

    const handleChange = (e) => {
    ssetEmail(e.target.value);
  };
  return (
    <div className="login-wrapper">
      <div>
        <form className="form" onChange={handleChange}>
          <div className="flex-column">
            <label>Email </label>
          </div>

          <div className="inputForm">
            <input
              type="text"
              className="input"
              id="email"
              placeholder="Enter your Email"
            />
          </div>

          <button className="button-submit"  onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPasswordEmail