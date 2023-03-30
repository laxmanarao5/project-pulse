import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectDetailedView from '../common_components/ProjectDetailedView'
import AddConcerns from './AddConcerns'
import AddProjectUpdate from './AddProjectUpdate'

function ProjectDetailedViewPM() {

    let {project_id} = useParams()
  return (
    <div>
      <div className='row container mx-auto mb-5'>
        <div className='col-5'>
        <AddConcerns project_id={project_id}/>
        </div>
        <div className='col-5'>
        <AddProjectUpdate project_id={project_id}/>
        </div>
      </div>
      
       <div className=''>
       <ProjectDetailedView url={`http://localhost/project-manager/project/${project_id}`}/>
       </div>

    </div>
  )
}


export default ProjectDetailedViewPM