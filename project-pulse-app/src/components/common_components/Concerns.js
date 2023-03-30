import React from 'react'

function Concerns({concerns}) {
  return (
    <div className='container shadow'>
                <h3 className='text-success'>Concerns</h3>

            <table className='table table-bordered table-striped table-responsive'>
            
            <thead className='bg-dark text-white'>
            <tr>
                <th>SL NO</th>
                <th>Raised By</th>
                <th>Raised On</th>
                <th>Description</th>
                
            </tr>
            </thead>
            <tbody>
          {concerns?.map((concern,index)=>(
                <tr key={index}  >
                    
                <td>{index+1}</td>
                <td>{concern.raised_by}</td>
                <td>{concern.raised_date}</td>
                <td>{concern.description}</td>
                </tr>))
                }
                </tbody>
            </table>

        </div>
  )
}

export default Concerns