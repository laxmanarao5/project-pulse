import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { get, useForm } from 'react-hook-form'
function Concerns() {

  let {handleSubmit,register,setValue,getValues}=useForm()

    //state for modal
  let [show,setShow]=useState()

  let token = sessionStorage.getItem("token")

  //function to open model
  const openModal=()=>setShow(true)

  //function close model
  const closeModal=()=>setShow(false)

  const saveChanges = async () =>{
   let concern= getValues()
   concern.raised_date=new Date()
   console.log(concern);
   let res = await axios.post(`http://localhost/project-manager/concern/${1}`,concern,{headers:{
    Authorization:`Bearer ${token}`
   }})

  }

  return (
    <div>
      <div className='float-start ms-5'>
        <button className='btn btn-primary' onClick={openModal}>Raise a Concern</button>
      </div>

      <Modal show={show} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                            <Modal.Title>Raise a Concern</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                    <div className='m-3'>
                                    <label className='form-label'>Description</label>
                                    <input type="text" {...register("description")} className='form-control'/>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Severity</label>
                                    <select {...register("severity")} className='form-control' defaultValue='title'>
                                      <option value="title">-- Severity of Concern --</option>
                                      <option value="High">High</option>
                                      <option value="Medium">Medium</option>
                                      <option value="Low">Low</option>
                                      </select>
                                    </div>


                                    <div className='m-3'>
                                    <label  className='form-label'>Raised By Client</label>
                                    <select  {...register("raised_by_client")} className='form-control'>
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

export default Concerns