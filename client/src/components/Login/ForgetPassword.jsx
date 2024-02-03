import React,{useState} from 'react'
import { resetPassword } from '../../appwrite/api'
import { useNavigate, useLocation } from "react-router-dom";


export const ForgetPassword = () => {
     const searchParams = useLocation();
    const urlParams = new URLSearchParams(searchParams.search);
    const navigate = useNavigate();
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

 
    const [password, setPassword] = useState("")
   const handlePasswordReset = async()=> {
      const res = await resetPassword(userId,secret,password)
      if(res) {
        navigate;
      } else {
        console.log("error while setting new password");
      }
   }
  return (
    <div>
      <label>New Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handlePasswordReset}>Submit</button>
    </div>
  );
}
