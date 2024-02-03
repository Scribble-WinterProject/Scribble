import React,{useState} from 'react'
// import { resetPassword } from '../../appwrite/api'
import { useLocation } from "react-router-dom";


export const ForgetPassword = () => {
     const searchParams = useLocation();
    const urlParams = new URLSearchParams(searchParams.search);

    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

 
    const [password, setPassword] = useState("")
   const handlePasswordReset = async()=> {
      const newPaswword = await resetPassword(userId,secret,password)
   }
  return (
    <div>
        <label>New Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button >Submit</button>
    </div>
  )
}
