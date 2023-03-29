import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import DisplayUsers from './DisplayUsers';
function AllUsers() {
    let token=sessionStorage.getItem("token")
    let [users,setUsers]=useState([])
    //Get all users
    const getAllUsers=async()=>{
        let res=await axios.get("http://localhost/super-admin/role/users",{headers:{
          Authorization:`Bearer ${token}`
        }})
        console.log(res.data);
        setUsers(res.data.payload)
      }
      useEffect(()=>{
            getAllUsers()
      },[])
  return (
    <div>
        <DisplayUsers users={users} setUsers={setUsers} parentComp={"allUsersComp"}/>
    </div>
  )
}

export default AllUsers