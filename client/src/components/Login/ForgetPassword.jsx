import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userForgetPasswordMutation, userLogOutMutation } from "../../reactQuery/queries";
import "./Login.css";


export const ForgetPassword = () => {
  const searchParams = useLocation();
  const urlParams = new URLSearchParams(searchParams.search);
  const navigate = useNavigate();
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const { mutateAsync: forgetPassword } = userForgetPasswordMutation();
  const { mutateAsync: logOutFunction } = userLogOutMutation();

  const [password, setPassword] = useState("");
  const handlePasswordReset = async (e) => {
      try {
          e.preventDefault();
          const res = await forgetPassword({userId, secret, password});
          console.log(res);
          
          const logout = await logOutFunction();
          if (logout) {
            navigate("/login");
          }
      } catch (error) {
        console.log(error);
        return
      }
  };
  return (
    <div className="login-wrapper">
      <div>
        <form className="form" onChange={(e)=> setPassword(e.target.value)}>
          <div className="flex-column">
            <label>Password </label>
          </div>

          <div className="inputForm">
            <input
              type="text"
              className="input"
              id="password"
              placeholder="Enter your Password"
            />
          </div>

          <button className="button-submit"  onClick={handlePasswordReset}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
