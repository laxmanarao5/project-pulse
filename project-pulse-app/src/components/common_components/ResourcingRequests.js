import React from 'react'

function ResourcingRequests({resourcing_requests}) {
  return (
    <div className='container shadow'>
                <h3 className='text-success'>Resourcing Requests</h3>

            <table className='table table-bordered table-striped table-responsive'>
            
            <thead className='bg-dark text-white'>
            <tr>
                <th>Req ID</th>
                <th>Raised By</th>
                <th>Date</th>
                <th>Resource Role</th>
                <th>No of resources</th>
                <th>Status</th>
                <th>Action</th>
                
            </tr>
            </thead>
            <tbody>
          {resourcing_requests?.map((request,index)=>(
                <tr key={index}  >
                    
                <td>{request.id}</td>
                <td>{request.raised_by}</td>
                <td>{request.date}</td>
                <td>{request.resource_role}</td>
                <td>{request.no_of_resources}</td>
                <td>{request.status}</td>
                <td><button className='btn btn-success'>Grant Resources</button></td>
                </tr>))
                }
                </tbody>
            </table>

        </div>
  )
}

export default ResourcingRequests