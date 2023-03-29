import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function AddProjectsGDO() {
    const {handleSubmit,register,formState:{errors}}=useForm()
    const [managers,setManagers]=useState({gdo:[],pm:[]})
    let [registrationResponse,setRegistrationResponse]=useState("")
  
    let navigate=useNavigate()

    //Get token from browser storage
    let token = sessionStorage.getItem("token")
    
    //Get all managers
    const getData = async() =>{
        let res= await axios.get("http://localhost/user/managers")
        console.log(res.data);
        setManagers(res.data)
    }
    //fetch managers after first render
    useEffect(()=>{
        getData()
    },[])

    //function to handle registration
    const handleAddProject = async(project) =>{
      
       
       project.status = "In progress"
       console.log(project)
    
       //Send API request
    let res= await axios.post("http://localhost/gdo/project",project,{headers:{
        Authorization:`Bearer ${token}`
    }})
        //if project insertedd successfully inserted
        if(res.data.message==="Project added sucessfully")
        {
          navigate("/gdo/all-projects")
        } 
  
    }


  return (
    <div>
        <div className='w-50 mx-auto shadow rounded p-3 '>
        {registrationResponse!=="" && <p>{registrationResponse}</p>}
      <div className='m-3'>
        <h1>Add Project </h1>
      </div>

        <form className='form' onSubmit={handleSubmit(handleAddProject)}>

          {/* Input field for Project name */}
        <div className='m-3'>
            <input type="text" className='form-control' {...register("project_name",{required:"Project is required"})} placeholder='Project Name'/>
            {errors.name && <p className='text-danger text-start ms-2'>{errors.name.message}</p>}
          </div>

          {/* Client input  */}
          <div className='m-3'>
            <input type="text" className='form-control' {...register("client",{required:"Client is required"})} placeholder='Client'/>
            {errors.email && <p className='text-danger text-start ms-2'>{errors.email.message}</p>}
          </div>
          {/* Start date */}
            <div className='m-3'>
                <label className='form-label'>Start Date</label>
                <input type="date" className='form-control' {...register('start_date',{required:"Start date is required"})} placeholder="Start date"/>
            </div>
          {/* Client manager input field */}
          <div className='m-3'>
            <input type="number" className='form-control' {...register("client_account_manager",{required:"Client Account Manager is required"})} placeholder='Client Manager'/>
            {errors.client_account_manager && <p className='text-danger text-start ms-2'>{errors.client_account_manager.message}</p>}
          </div>

            {/* Domain of Project */}
          <div className='m-3'>
            <select className='form-control' {...register("domain",{required:"Domain of project is required"})} defaultValue="title">
                <option value="title" disabled>--- Select Domain of project ---</option>
                <option value="Artificial intelligence">Artificial intelligence</option>
                <option value="Web Technology">Web Technology</option>
                <option value="Data Science">Data Science</option>
                <option value="IoT">IoT</option>
               
            </select> 
          </div>

          {/* Type of Project */}
          <div className='m-3'>
            <select className='form-control' {...register("project_type",{required:"Type of project is required"})} defaultValue="title">
                <option value="title" disabled>--- Select Type of project ---</option>
                <option value="Development">Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Test Automation">Test Automation</option>
                <option value="Performance Testing">Performance Testing</option>
                <option value="Security">Security</option>
                <option value="Sustenance Engineering">Sustenance Engineering</option>
                <option value="Mobility">Mobility</option>
                <option value="Storage">Storage</option>
               
            </select> 
          </div>


          {/* Project Manager field */}
          <div className='m-3'>
            <select className='form-control' {...register("project_manager",{required:"Project Manager is required"})} defaultValue="title">
                <option  value="title" >--- Select Project Manager for the project ---</option>
                {managers.pm.map((pm,index)=>(
                        <option key={index} value={pm.email}>{pm.name}</option>
                ))}  
            </select> 
          </div>

            {/* Submit button */}
          <div className='m-3'>
            <button className='btn btn-success d-block w-100 mx-auto'>Add Project</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddProjectsGDO