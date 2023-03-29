import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { userLogin } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
function Login() {
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let {userObj,errorMessage,role}=useSelector(state=>state.user)

  //form handlers
  const {handleSubmit,register}=useForm()

    const handleLogin = (credentials)=> {
        console.log(credentials);
        let actionObj=userLogin(credentials)
        dispatch(actionObj)
    }

    useEffect(()=>{
      role==="super_admin"?navigate("/super-admin"):
      role==="admin"?navigate("/admin"):
      role==="gdo"?navigate("/gdo"):
      role==="project_manager"?navigate("/project-manager"):
      navigate("/")
      
    },[role])

  return (
    <div>
      <div>
        {/* <h1>Log In</h1> */}
      </div>
      <div className='w-50 mx-auto shadow rounded p-3 '>

        {errorMessage===""?<p></p>:<p className='text-danger'>{errorMessage}</p>}

        <form className='form' onSubmit={handleSubmit(handleLogin)}>
          {/* Email input  */}
          <div className='m-3'>
            <input type="text" className='form-control' {...register("email",{required:"Email is required"})} placeholder='Email address'/>
          </div>

          {/* Password input field */}
          <div className='m-3'>
            <input type="password" className='form-control' {...register("password",{required:"Password is required"})} placeholder='Password'/>
          </div>

          <div className='m-3'>
            <button className='btn btn-primary d-block w-100 mx-auto'>Log In</button>
          </div>
        </form>

        <Link to="forget-password" className='link-warning' style={{textDecoration:"none"}}>Forget Password ?</Link>
        <hr className='m-3'/>
        <div>
            <Link to="register"><button className='btn btn-success m-3'>Create new account</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Login