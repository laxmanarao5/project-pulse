import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { get, useForm } from 'react-hook-form'
function AddProjectUpdate({project_id}) {

  let {handleSubmit,register,setValue,getValues}=useForm()

    //state for modal
  let [show,setShow]=useState()

  let token = sessionStorage.getItem("token")

  //function to open model
  const openModal=()=>setShow(true)

  //function close model
  const closeModal=()=>setShow(false)

  const saveChanges = async () =>{
   let update= getValues()
   update.date=new Date()
   closeModal()
   console.log(update);
   let res = await axios.post(`http://localhost/project-manager/update/${project_id}`,update,{headers:{
    Authorization:`Bearer ${token}`
   }})
   console.log(res);
    

  }

  return (
    <div>
      <div className='bg-success ms-5 p-3 rounded text-white'>
        <h3 className='text-white text-center'>Update project status</h3>
        <p>Here you can add project updates</p>
        <button className='btn btn-light' onClick={openModal}>Add Project Update</button>
      </div>

      <Modal show={show} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                            <Modal.Title>Raise a Concern</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                    <div className='m-3'>
                                    <label className='form-label'>Project Status</label>
                                    <textarea  {...register("project_status")} className='form-control' rows="5"/>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Shedule Status</label>
                                    <select {...register("shedule_status")} className='form-control' defaultValue='title'>
                                      <option value="title">-- Shedule Status --</option>
                                      <option value="green">Greeen</option>
                                      <option value="amber">Amber</option>
                                      <option value="red">Red</option>
                                      </select>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Resourcing Status</label>
                                    <select {...register("resourcing_status")} className='form-control' defaultValue='title'>
                                      <option value="title">-- Resource Status --</option>
                                      <option value="green">Greeen</option>
                                      <option value="amber">Amber</option>
                                      <option value="red">Red</option>
                                      </select>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Quality Status</label>
                                    <select {...register("quality_status")} className='form-control' defaultValue='title'>
                                      <option value="title">-- Quality Status --</option>
                                      <option value="green">Greeen</option>
                                      <option value="amber">Amber</option>
                                      <option value="red">Red</option>
                                      </select>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Waiting for Client Inputs</label>
                                    <select {...register("waiting_for_client_inputs")} className='form-control' defaultValue='title'>
                                      <option value="title">-- Client Inputs --</option>
                                      <option value={true}>Yes</option>
                                      <option value={false}>No</option>
                                      
                                      </select>
                                    </div>

                                    

                                    
                                    
                            </form>
                            
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={saveChanges}>
                                Raise Concern
                            </Button>
                            </Modal.Footer>
                        </Modal>
    </div>
  )
}



export default AddProjectUpdate