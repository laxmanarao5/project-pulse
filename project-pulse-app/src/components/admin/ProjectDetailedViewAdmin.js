import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectDetailedView from '../common_components/ProjectDetailedView'

function ProjectDetailedViewAdmin() {

    let {project_id} = useParams()
  return (
    <div>
        <ProjectDetailedView url={`http://localhost/admin/project/${project_id}`}/>
    </div>
  )
}

export default ProjectDetailedViewAdmin