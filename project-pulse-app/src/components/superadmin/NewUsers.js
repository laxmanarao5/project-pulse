import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import DisplayUsers from './DisplayUsers';
function NewUsers() {
    let token=sessionStorage.getItem("token")
    let [users,setUsers]=useState([])
     //Get newly registered users
     const getNewUsers=async()=>{
        let res=await axios.get("http://localhost/super-admin/role/not-assigned-users",{headers:{
          Authorization:`Bearer ${token}`
        }})
        console.log(res.data);
        setUsers(res.data.payload)
      }
      useEffect(()=>{
            getNewUsers()
      },[])
  return (
    <div>
        <DisplayUsers users={users} setUsers={setUsers} parentComp={"newUsersComp"}/>
    </div>
  )
}

export default NewUsers