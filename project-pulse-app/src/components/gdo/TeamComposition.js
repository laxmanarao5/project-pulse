import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Modal} from "react-bootstrap"
import axios from 'axios'
function TeamComposition({project_id}) {
    let {register,setValue,getValues}=useForm()


    //state for modal
  let [show,setShow]=useState()

  //function to open model
  const openModal=()=>setShow(true)

  //function close model
  const closeModal=()=>setShow(false)

    //read token from browser storage
  let token=sessionStorage.getItem("token")

    //function to handle edit click event
  const editUser=()=>{
    openModal()
  }

    //function to save changes in to backend
    const saveChanges= async () =>{
      let newEmp=getValues()
    console.log(newEmp);
    closeModal()
    //update data through API
    console.log(`http://localhost/gdo/team/project/${project_id}`);
      let res=await axios.post(`http://localhost/gdo/team/project/${project_id}`,{team:[newEmp]},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      console.log(res);
    }
  return (
    <div className=' float-start bg-black '>
          <button className='btn btn-primary' onClick={editUser}>Add Resource</button>



          {/* Modal for editing */}

          <Modal show={show} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                            <Modal.Title>Add Employee</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                    <div className='m-3'>
                                    <label className='form-label'>Name</label>
                                    <input type="text" {...register("name")} className='form-control'/>
                                    </div>

                                    <div className='m-3'>
                                        <label>Role</label>
                                    <select  defaultValue="title" {...register("role")} className="form-control">
                                        <option value="title">-- Select Role --</option>
                                            <option value="Front-End Developer">Front-End Developer</option>
                                            <option value="Backend-Developer">Backend-Developer</option>
                                            <option value="DevOps">DevOps</option>
                                    </select>
                                    </div>
                                    


                                    <div className='m-3'>
                                    <label>Exposed To Client</label>
                                    <select  {...register("exposed_to_customer")} className="form-control">
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                 </select>
                                    </div>
                                    <div className='m-3'>
                                    <label>Exposed To Client</label>
                                    <select  {...register("allocation_type")} className="form-control">
                                            <option value="permanent">Permanent</option>
                                            <option value="temporary">Temporary</option>
                                 </select>
                                    </div>
                                    
                            </form>
                            
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={saveChanges}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
      </div>


  )
}

export default TeamComposition