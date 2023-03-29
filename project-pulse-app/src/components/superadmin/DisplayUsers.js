import React, { useState } from 'react'
import {useSelector} from "react-redux"
import {Button,Modal} from "react-bootstrap"
import axios from 'axios'
import {useForm} from "react-hook-form"
function DisplayUsers({users,setUsers,parentComp}) {

    let {handleSubmit,register,setValue,getValues}=useForm()


    //state for modal
  let [show,setShow]=useState()

  //function to open model
  const openModal=()=>setShow(true)

  //function close model
  const closeModal=()=>setShow(false)

    //read token from browser storage
  let token=sessionStorage.getItem("token")
 
  //unblock user
  const unBlockUser = async(email) =>{
    console.log(token);
    let res=await axios.delete(`http://localhost/super-admin/undo-delete/user/${email}`,{headers:{
      Authorization:`Bearer ${token}`
    }})
    console.log(res);
    res=await axios.get("http://localhost/super-admin/blocked-users",{headers:{
        Authorization:`Bearer ${token}`
      }})
      setUsers(res.data.payload)
  }

  const deleteUser = async(email) =>{
    let res=await axios.delete(`http://localhost/super-admin/delete/user/${email}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    
    })
    console.log(res);

    res=await axios.get("http://localhost/super-admin/role/users",{headers:{
        Authorization:`Bearer ${token}`
      }})
    setUsers(res.data.payload)
  }
  //function to handle edit click event
  const editUser=(user)=>{
    openModal()
    //set values to input .
    setValue("name",user.name)
    setValue("email",user.email)
    setValue("role",user.role)
    // setValue("url",state.url)
  }

    //function to save changes in to backend
    const saveChanges= async () =>{
      let modifiedUser=getValues()
      console.log(modifiedUser);
      //add id to modified user
    //   // modifiedUser.id=state.id
    closeModal()
    //   //update data through API
      let res=await axios.put(`http://localhost/super-admin/role/user/${modifiedUser.email}`,modifiedUser,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })

      console.log(res);

        let url=""
        parentComp==="allUsersComp"?url="http://localhost/super-admin/role/users":parentComp==="newUsersComp"?url="http://localhost/super-admin/role/not-assigned-users":url=""
        res=await axios.get(url,{headers:{
        Authorization:`Bearer ${token}`
      }})
    setUsers(res.data.payload)
    //   setUserInfo(modifiedUser)
    }

  return (
    <div>
        <table className='table table-bordered table-striped table-responsive'>
            
                <thead className='bg-dark text-white'>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
              {users.map((user,index)=>(
                    <tr key={index}>
                        
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                    {/* <form>
                        </form> */}
                        {user.role===null?"Role not assigned":user.role}
                    </td>
                    <td>{parentComp==="blockedUsersComp"?<button className='btn btn-success' onClick={()=>unBlockUser(user.email)}>Unblock</button>:<div>
                        <button className='btn btn-primary' onClick={()=>editUser(user)}>Edit</button>
                        <button className='btn btn-danger ms-3' onClick={()=>deleteUser(user.email)}>Block</button>
                        </div>}
                    </td>
                    {/* Modal for editing */}

                        <Modal show={show} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                    <div className='m-3'>
                                    <label className='form-label'>Name</label>
                                    <input type="text" {...register("name")} className='form-control' disabled/>
                                    </div>

                                    <div className='m-3'>
                                    <label  className='form-label'>Email</label>
                                    <input type="email" {...register("email")} className='form-control' disabled/>
                                    </div>


                                    <div className='m-3'>
                                    <select defaultValue={user.role} {...register("role")} className="form-control">
                                            <option value={null}>Not-Assigned</option>
                                            <option value="admin">Admin</option>
                                            <option value="super_admin">Super Admin</option>
                                            <option value="gdo">GDO</option>
                                            <option value="project_manager">Project Manager</option>
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
                    </tr>
                ))}  
                </tbody>

        </table>
    </div>
  )
}

export default DisplayUsers