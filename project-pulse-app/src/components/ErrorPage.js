import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    let navigate=useNavigate()
  const handleRedirect = () =>{
      navigate("/")
  }
  return (
    <div>
      <div className='text-center m-5' onClick={handleRedirect}>
        <h1 className='text-danger'>You're Lost </h1>
        <h1 className='text-danger'>Click Here to go to Homepage</h1>
        <button className='btn btn-success m-5'>Homepage</button>
      </div>
    </div>
  )
}

export default ErrorPage