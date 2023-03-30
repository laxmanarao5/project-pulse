import React from 'react'

function TeamDetails({employees}) {
  return (
    <div className='container shadow'>
                <h3 className='text-success'>Team Composition</h3>

            <table className='table table-bordered table-striped table-responsive'>
            
            <thead className='bg-dark text-white'>
            <tr>
                <th>EMP ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Billing</th>
                <th>Allocation Type</th>
                
            </tr>
            </thead>
            <tbody>
          {employees?.map((emp,index)=>(
                <tr key={index}  >
                    
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.start_date}</td>
                <td>{emp.end_date===null?"-":emp.end_date}</td>
                <td>{emp.status===true?"Active":"Inactive"}</td>
                <td>{emp.billing_status}</td>
                <td>{emp.allocation_type}</td>
                
                </tr>))
                }
                </tbody>
            </table>

        </div>
  )
}

export default TeamDetails