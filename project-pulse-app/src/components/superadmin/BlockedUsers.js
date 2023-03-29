import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import DisplayUsers from './DisplayUsers';
function BlockedUsers() {
    let token=sessionStorage.getItem("token")
    let [users,setUsers]=useState([])
    //Get all users
    const getBlockedUsers=async()=>{
        let res=await axios.get("http://localhost/super-admin/blocked-users",{headers:{
          Authorization:`Bearer ${token}`
        }})
        console.log(res.data);
        setUsers(res.data.payload)
      }
      useEffect(()=>{
            getBlockedUsers()
      },[])
  return (
    <div>
        <DisplayUsers users={users} setUsers={setUsers} parentComp={"blockedUsersComp"}/>
    </div>
  )
}

export default BlockedUsers