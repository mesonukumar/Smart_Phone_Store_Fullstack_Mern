import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import "../../styles/authStyles.css";
import  axios  from 'axios';

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/auth/forgot-password`,{
       
         email,
         newPassword,
         answer,
       });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      

       navigate("/login");
   
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
     toast.error("Something went wrong");
    }
  };
  return (
    <Layout title='forgot Password Ecommerce -App'>
       <div className="form-container">
     
 <form onSubmit={handleSubmit}>

  <div className="mb-3">
  <h4 className='title'>Reset Password</h4>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
 className="form-control" id="exampleInputEmail"  placeholder='Enter Your Email'
 required/>

  </div>
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
 className="form-control" id="exampleInputEmail"  placeholder='Enter Your Favourite Sports'
 required/>

  </div>
  <div className="mb-3">

<input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
 className="form-control" id="exampleInputPassword1" placeholder=' Enter Your New Password'
 required/>
</div>

  <button type="submit" className="btn btn-primary">RESET</button>
</form>

    </div>
    </Layout>
  )
}

export default ForgotPassword
