import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectDetailedView from '../common_components/ProjectDetailedView'
import TeamComposition from './TeamComposition'

function ProjectDetailedViewGDO() {

    let {project_id} = useParams()
  return (
    <div>
        <TeamComposition project_id={project_id} />
        <ProjectDetailedView url={`http://localhost/gdo/project/${project_id}`}/>
    </div>
  )
}



export default ProjectDetailedViewGDO