import axios from 'axios'
import React,{useState} from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'

function Register() {
  //form handlers
  const {handleSubmit,register,reset,formState:{errors}}=useForm()

  let [registrationResponse,setRegistrationResponse]=useState("")

  let navigate=useNavigate()

  //function to handle registration
  const handleRegistration = async(userObj) =>{
    
    console.log(userObj);
    if(userObj.password===userObj.confirmPassword){
      delete userObj.confirmPassword
      let res= await axios.post("http://localhost/user/register",userObj)
      // console.log(res.data);
      setRegistrationResponse(res.data.message)
      if(res.data.message==="User inserted sucessfully")
      {
        navigate("/")
      }
    }
    else{
      setPasswordMatch(false)
    }


  }
  let [passwordMatch,setPasswordMatch]=useState(true)

  const handleRedirection = () =>{
      navigate("/")
  }
  

  return (
    <div className='m-5'>
      
      <div className='w-50 mx-auto shadow rounded p-3 '>
        {registrationResponse!=="" && <p>{registrationResponse}</p>}
      <div className='m-3'>
        <h1>Registration</h1>
      </div>

        <form className='form' onSubmit={handleSubmit(handleRegistration)}>

          {/* Input field for name */}
        <div className='m-3'>
            <input type="text" className='form-control' {...register("name",{required:"Name is required"})} placeholder='Name'/>
            {errors.name && <p className='text-danger text-start ms-2'>{errors.name.message}</p>}
          </div>

          {/* Email input  */}
          <div className='m-3'>
            <input type="text" className='form-control' {...register("email",{required:"Email is required"})} placeholder='Email address'/>
            {errors.email && <p className='text-danger text-start ms-2'>{errors.email.message}</p>}
          </div>

          {/* Password input field */}
          <div className='m-3'>
            <input type="password" className='form-control' {...register("password",{required:"Password is required"})} placeholder='Password'/>
            {errors.password && <p className='text-danger text-start ms-2'>{errors.password.message}</p>}
          </div>

          {/* Password input field */}
          <div className='m-3'>
            <input type="password" className='form-control' {...register("confirmPassword")} placeholder='Confirm Password'/>
            {passwordMatch==false && <p className='text-danger text-start ms-2'>Password didn't match</p>}
          </div>

            {/* Submit button */}
          <div className='m-3'>
            <button className='btn btn-success d-block w-100 mx-auto'>Register</button>
          </div>
        </form>

        
        <hr className='m-3'/>
        <div>
            <button className='btn btn-primary m-3 d-block w-50 mx-auto' onClick={handleRedirection}>Click here Login</button>
        </div>
      </div>
    </div>
  )
}

export default Register