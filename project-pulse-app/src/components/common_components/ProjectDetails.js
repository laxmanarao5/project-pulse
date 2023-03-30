import React from 'react'

function ProjectDetails({project}) {
  return (
    <div className='container mt-4 mb-4 shadow rounded'>
    <h3 className='text-success text-center'>Project detailed view</h3>
    <div className='row text-start mt-3'>

        <div className='col-4'>
            <p>Project Name : {project.project_name}</p>
            <p>Client : {project.client}</p>
            <p>Domain : {project.domain}</p>
        </div>

        <div className='col-4 '>
            <p>Start Date : {project.start_date}</p>
            <p>Status : {project.status}</p>
            <p>End Date : {project.end_date===null?"-" :project.end_date}</p>
        </div>

        <div className='col-4 '>
            <p></p>
            <p>Project Type : {project.project_type}</p>
            <p>GDO : {project.gdo}</p>
            <p>Project Manager : {project.project_manager}</p>
        </div>


    </div>
    </div>
  )
}

export default ProjectDetails