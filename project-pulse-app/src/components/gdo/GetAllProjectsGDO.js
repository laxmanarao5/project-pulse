import React from 'react'
import { useParams } from 'react-router-dom'
import AllProjects from '../common_components/AllProjects'

function GetAllProjectsGDO() {
  return (
    <div>
        <AllProjects url={"http://localhost/gdo/projects"}/>
    </div>
  )
}

export default GetAllProjectsGDO