import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AllProjects({url}) {

    let navigate=useNavigate()
    
    let [projects,setProjects]= useState([])

    let token = sessionStorage.getItem("token")

    const redirectHandler = (project_id) =>{
            navigate(`project/${project_id}`)
    }

    //get all projects 
    const getProjects = async ( ) =>{
        console.log(url);
            let res = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setProjects(res.data.payload)
            
    }

    useEffect(()=>{
            getProjects()
            console.log(projects);
    },[])
  return (
    <div>
        <div>
        <table className='table table-bordered table-striped table-responsive'>
            
                <thead className='bg-dark text-white'>
                <tr>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
              {projects.map((project,index)=>(
                    <tr key={index} style={{cursor:"pointer"}} onClick={()=>redirectHandler(project.project_id)}>
                        
                    <td>{project.project_name}</td>
                    <td>{project.client}</td>
                    <td>{project.status}</td>
                    <td>{project.start_date.toString().slice(0,10)}</td>
                    <td>{project.end_date===null?"-":project.end_date.toString().slice(0,10)}</td>
                    </tr>))
                    }
                    </tbody>
                </table>
            </div>
                
    </div>
  )
}

export default AllProjects