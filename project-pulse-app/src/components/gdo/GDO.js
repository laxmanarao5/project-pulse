import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import { Outlet, useNavigate } from 'react-router-dom'
import { clearState } from '../../slices/userSlice'

function GDO() {
    let {userObj,role}=useSelector(state=>state.user)
    let navigate=useNavigate()

    let dispatch = useDispatch()

    const handleLogout = ()=>{
        let actionObj = clearState()
        dispatch(actionObj)
        sessionStorage.removeItem("token")
        navigate("/")
    }

  return (
    <div>
      <div className='bg-primary p-4 nav'>
        <li className='nav-item float-end'>
        <NavLink className='text-warning text-end' onClick={()=>navigate("")}> All Projects</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink className='text-warning text-end' onClick={()=>navigate("add-project")}> Add Project</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink className='text-warning text-end' onClick={handleLogout}> Logout</NavLink>
        </li>
      </div>
      <div className=''>
        <p className='text-success fs-4 p-3'>Welcome {userObj.name}</p>
      </div>
      <div>
        {/* <DisplayUsers users={users} setUsers={setUsers}/> */}
        <Outlet/>
      </div>
    </div>
  )
}

export default GDO