import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
        <button className="accordion">Project Details</button>
        <div className="panel">
        <p>Lorem ipsum...</p>
        </div>
    </div>
  )
}

export default ProjectDetailedView