import React from 'react'
import { NavLink } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {clearState} from '../../slices/userSlice'
function LogoutComponent() {
    let dispatch = useDispatch()

    const handleLogout = ()=>{
        let actionObj = clearState()
        dispatch(actionObj)
        sessionStorage.removeItem("token")
    }
  return (
    <li className='nav-item float-end'>
        <NavLink onClick={handleLogout}>Logout</NavLink>
    </li>
  )
}

export default LogoutComponent