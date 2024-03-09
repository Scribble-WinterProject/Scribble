import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userForgetPasswordMutation, userLogOutMutation } from "../../reactQuery/queries";

export const ForgetPassword = () => {
  const searchParams = useLocation();
  const urlParams = new URLSearchParams(searchParams.search);
  const navigate = useNavigate();
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const { mutateAsync: forgetPassword } = userForgetPasswordMutation();
  const { mutateAsync: logOutFunction } = userLogOutMutation();

  const [password, setPassword] = useState("");
  const handlePasswordReset = async () => {
      try {
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
    <div>
      <label>New Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handlePasswordReset}>Submit</button>
    </div>
  );
};
