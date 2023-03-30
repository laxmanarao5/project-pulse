import React from 'react'

function Updates({updates}) {
  return (
    <div className='container shadow'>
                <h3 className='text-success'>Project Updates</h3>

            <table className='table table-bordered table-striped table-responsive'>
            
            <thead className='bg-dark text-white'>
            <tr>
                <th>SL NO</th>
                <th>Status of project</th>
                <th>Date</th>
                <th>Shedule Status</th>
                <th>Resourcing Status</th>
                <th>Quality Status</th>
                <th>Client Inputs</th>
                
            </tr>
            </thead>
            <tbody>
          {updates?.map((update,index)=>(
                <tr key={index}  >
                    
                <td>{update.id}</td>
                <td>{update.status}</td>
                <td>{update.date.toString().slice(0,10)}</td>
                <td>{update.shedule_status}</td>
                <td>{update.resourcing_status}</td>
                <td>{update.quality_status}</td>
                <td>{update.waiting_for_client_inputs}</td>
                </tr>))
                }
                </tbody>
            </table>

        </div>
  )
}

export default Updates