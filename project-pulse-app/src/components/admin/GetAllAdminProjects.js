import React from 'react'
import AllProjects from '../common_components/AllProjects'

function GetAllAdminProjects() {
  return (
    <div>

        <AllProjects url={"http://localhost/admin/projects"}/>
    </div>
  )
}

export default GetAllAdminProjects