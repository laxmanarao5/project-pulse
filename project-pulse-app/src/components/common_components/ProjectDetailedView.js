import axios from 'axios'
import React, { useEffect } from 'react'

function ProjectDetailedView({url}) {
    let token = sessionStorage.getItem("token")

    const getProjectDetailedView = async() =>{
        let res=await axios.get(url,{headers:{
            Authorization:`Bearer ${token}`
        }})
    }

    useEffect(()=>{
        getProjectDetailedView()
    })

  return (
    <div>
        <button className="accordion">Section 1</button>
        <div className="panel">
        <p>Lorem ipsum...</p>
        </div>
    </div>
  )
}

export default ProjectDetailedView