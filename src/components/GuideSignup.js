

import Navbar from './Navbar';
import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom';

function GuideSignup(props) {
  const [credentials, setCredentials] = useState({name:"",email: "",DOMAIN:"", QUALIFICATION:"",EXPERICENCE:"",cpassword: "",confirmPassword:""}) 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      const {name,email,DOMAIN,QUALIFICATION,EXPERICENCE,cpassword,confirmPassword} = credentials;
      e.preventDefault();
      const response = await fetch("http://localhost:5000/guidepost", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email, DOMAIN,QUALIFICATION,EXPERICENCE,cpassword,confirmPassword})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          localStorage.setItem('guideEmail', credentials.email); 
          localStorage.setItem('token', json.token); 
         navigate('/guidereview');
      }
      else{
         alert("Please Login Properly")
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const styles = `
  .container-fluid {
    background-repeat: no-repeat;
    background-size: cover;
    // height: 100vh;
    // width: 100vw;
    position: relative;
    margin-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    margin-top: 0px;
    height: 130vh; 
    width:30vw;
  }

  .form-label {
    font-weight: bold;
    text-align: left
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .form-control {
    border-radius: 5px;
  }

  .btn-primary {
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 10px;
  }

  .btn-primary:hover {
    background-color: #0069d9;
  }
  .my-element {
    float: right;
  }
  
  `;

  return (

    <>
    <Navbar/>
      <style>{styles}</style>
      <div 
        className='container-fluid content-container'
        style={{
          backgroundImage: 'url(bg-mit.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '170vh',
          width: '100vw',
          position: 'relative',
          marginTop: '0'
        }}
      >
      <div className='container-fluid content-container'>
        <div className='form-container'>
        <h1 style={{marginLeft: '5rem'}}>Guide Login</h1>
          <form onSubmit={handleSubmit}
            className='my-5'
            style={{
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
             <div className="mb-3 p" style={{marginLeft: '1rem'}} >
                    <label htmlFor="name" className="form-label">Name</label>
                    <input  onChange={onChange} type="test" className="form-control"  id="name" name="name" aria-describedby="emailHelp" />
                 </div>
                 <div className='mb-3 ' style={{marginLeft: '1rem'}}>
               <label htmlFor='email' className='form-label'>
                Email address
               </label>
               <input onChange={onChange}
                 type='email'
                 className='form-control'
                 id='email'
                 name='email'
                 aria-describedby='emailHelp'
              />
              <div id='emailHelp' className='form-text ' style={{marginLeft: '1rem'}}>
                 We'll never share your email with anyone else.
             </div>

             <div className="mb-3 p" >
                    <label htmlFor="DOMAIN" className="form-label">DOMAIN</label>
                    <input  onChange={onChange} type="test" className="form-control"  id="DOMAIN" name="DOMAIN" aria-describedby="emailHelp" />
                 </div>
                 <div className="mb-3 p" >
                    <label htmlFor="QUALIFICATION" className="form-label">QUALIFICATION</label>
                    <input onChange={onChange} type="test" className="form-control"  id="QUALIFICATION" name="QUALIFICATION" aria-describedby="emailHelp" />
                 </div>
                 <div className="mb-3 p" >
                    <label htmlFor="EXPERICENCE" className="form-label">YEAR OF EXPERICENCE</label>
                    <input onChange={onChange} type="test" className="form-control"  id="EXPERICENCE" name="EXPERICENCE" aria-describedby="emailHelp" />
                 </div>


             </div>
             <div className="mb-3 " style={{marginLeft: '1rem'}}>
                     <label htmlFor="password" className="form-label">Password</label>
                     <input onChange={onChange} type="password" className="form-control"  name="cpassword" id="cpassword" required/>
                 </div>
                <div className="mb-3 " style={{marginLeft: '1rem'}}>
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                     <input onChange={onChange} type="password" className="form-control"  name="confirmPassword" id="confirmPassword" required />
                </div>

             <button type='submit' className='btn btn-primary' style={{marginLeft: '1rem'}}>
               Submit
            </button>
             
          </form>
        </div>
        
      </div>
      
      </div>
    </>
  );
}

export default GuideSignup;

