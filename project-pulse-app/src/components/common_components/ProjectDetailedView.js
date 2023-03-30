import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Concerns from './Concerns'
import ProjectDetails from './ProjectDetails'
import ProjectIndicator from './ProjectIndicator'
import ResourcingRequests from './ResourcingRequests'
import TeamDetails from './TeamDetails'
import Updates from './Updates'

function ProjectDetailedView({url}) {
    let token = sessionStorage.getItem("token")

    let [project,setProject]=useState({})

    const getProjectDetailedView = async() =>{
        let res=await axios.get(url,{headers:{
            Authorization:`Bearer ${token}`
        }})
        // console.log(res.data.payload);
        setProject(res.data.payload)
    }

    useEffect(()=>{
        getProjectDetailedView()
        console.log(project);
    },[])

  return (
    <div>

        {/* To Display Indiactor */}
            <ProjectIndicator project={project}/>

        {/* Project detailed View */}
            <ProjectDetails project={project}/>

         {/* Team Details */}
         {project.employees?.length===0?<p className='fs-2 text-danger m-5'>No Project Updates in last 2 weeks</p>:
         <TeamDetails employees={project.employees}/>
            }

         {/* Project Updates */}
         {project.updates?.length===0 ?<p className='fs-2 text-danger m-5'>No Project Updates in last 2 weeks</p>:
            <Updates updates={project.updates}/>
            }

        {/* Concerns */}
        {project.concerns===undefined?<p></p>:project.concerns.length===0?<p className='fs-2 text-danger m-5'>No Project Concerns found</p>:
            <Concerns concerns={project.concerns}/>
                }
        {/* Resourcing requests */}
        {project.resourcing_requests===undefined?<p></p>:project.resourcing_requests.length===0?<p className='fs-2 text-danger m-5'>No Resourcing Requests</p>:
            <ResourcingRequests resourcing_requests={project.resourcing_requests}/>
        }
        {/* </div> */}
    </div>
  )
}

export default ProjectDetailedView