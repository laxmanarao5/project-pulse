import axios from 'axios'
import React, { useState } from 'react'
import {useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
function ForgetPassword() {
    let navigate=useNavigate()

    //form controls
    let {handleSubmit,register,formState:{errors}}=useForm()

    //otp state
    let [emailOfUser,setEmail]=useState("")
    let [errorMessage,setErrorMessage]=useState("")
    let [resetSuccess,setResetSuccess]=useState("")
    const handleOtpForm = async(event) =>{
        let res=await axios.post("http://localhost/user/forget-password",event)
        console.log(res);
            console.log(event.email);
            setEmail(event.email)
    }

    const handleForgetPassword =async (passwordObject) =>{
        
        delete passwordObject.email
        console.log(passwordObject);
        let res=await axios.post(`http://localhost/user/reset-password/email/${emailOfUser}`,passwordObject)
        if(res.data.message==="Invalid OTP")
        {
            setErrorMessage(res.data.message)
        }
        else{
            setResetSuccess("Password reset successfull , Redirecting to Login page")
            setTimeout(()=>{
                navigate("/")
            },3000)
           
        }
        
    }

  return (
    <div>
        <div className='w-50 mx-auto mt-5'>
            <div className='mx-auto'>
                {resetSuccess!=="" && <p className='text-success fs-1 m-5'>{resetSuccess}</p>}
                <h2>Forget Password</h2>
                <form className='form' onSubmit={handleSubmit(handleOtpForm)}>
                
                <div className='m-3 w-50 mx-auto m'>
                    
                    <input {...register("email",{required:"Email address is required"})} className='form-control' type="email" placeholder='Email address'/>
                    {errors.email && <p className='text-danger text-start ms-2'>{errors.email.message}</p>}
                </div>

                <div className='m-3'>
                <button className='btn btn-success'>Click to Get OTP</button>
                </div>
                
                </form>

            </div>
            {emailOfUser===""?<p></p>:
            <div>
                <p className='text-danger'>An OTP has been sent to your email ,</p> 
                <p className='text-danger'>Enter OTP here to reset your password</p>
                <form className='form' onSubmit={handleSubmit(handleForgetPassword)}>


                
                {/* OTP input field */}
                <div className='m-3 w-50 mx-auto m'>
                {errorMessage!=="" && <p className='text-danger text-start '>{errorMessage}</p>}
                    <input className='form-control' type="text" {...register("otp",{required:"OTP is required"})} placeholder='Enter OTP'/>
                    {errors.otp && <p className='text-danger text-start ms-2'>{errors.otp.message}</p>}
                </div>

                {/* Password input field */}
                <div className='m-3 w-50 mx-auto'>
                    <input type="password" className='form-control' {...register("password",{required:"Password is required"})} placeholder='Enter new password'/>
                    {errors.password && <p className='text-danger text-start ms-2'>{errors.password.message}</p>}
                </div>

                {/* Password input field */}
                <div className='m-3 w-50 mx-auto'>
                    <input type="password" className='form-control' {...register("confirmPassword",{required:"ConfirPassword is required"})} placeholder='Confirm Password'/>
                    {errors.confirmPassword && <p className='text-danger text-start ms-2'>{errors.confirmPassword.message}</p>}
                </div>

                <div className='m-3'>
                <button className='btn btn-success'>Reset Passowrd</button>
                </div>
                
                </form>
        </div>
        }
            

        </div>
    </div>
  )
}

export default ForgetPassword