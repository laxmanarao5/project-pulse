import React from 'react'

function ProjectIndicator({project}) {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-4 col-4 bg-secondary pb-3 pt-2 shadow'>
                    <h3>Project Fitness</h3><hr/>
                    <h3>{project.fitness_indicator}</h3>
            </div>
            <div className='col-4 bg-warning pb-3 pt-2 shadow'>
                    <h3>Concerns</h3><hr/>
                    <h3>{project.concerns?.length}</h3>
            </div>
            <div className='col-4 bg-secondary pb-3 pt-2 shadow'>
                    <h3>Team Size</h3><hr/>
                    <h3>{project.team_members}</h3>
            </div>      
        </div>
    </div>
    
  )
}

export default ProjectIndicator