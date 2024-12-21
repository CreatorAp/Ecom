import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {

const [AllUsers, setAllUsers] = useState([])
const [OpenUpdatteRole, setOpenUpdatteRole] = useState(false)
const [UpdateUserDetails, setUpdateUserDetails] = useState({
  email: "",
  name: "",
  role: "",
  _id: ""
})

console.log("all users")
  const fetchAllUsers = async()=>{
    const dataResponse = await fetch(SummaryApi.all_user.url, {                   
      method: SummaryApi.all_user.method,            
      credentials: "include",
  }                
)


const dataApi = await dataResponse.json()
console.log("all usersssss",dataApi)

if(dataApi.success){
  setAllUsers(dataApi.data)
}

if(dataApi.error){
  toast(dataApi.message)
}


}

useEffect(() => {
  fetchAllUsers()
} , [] )


  return (
    <div className='bg-white pb-4'>
        <table className='w-full usertable'>
          <thead>
            <tr className='bg-black text-white'>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              AllUsers.map((el, index) => {
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.role}</td>
                      <td>{el.createdAt}</td>
                      <td>
                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                          onClick={()=> {
                            setUpdateUserDetails(el)
                            setOpenUpdatteRole(true)
                          }
                          } >
                          <MdModeEdit />
                        </button>
                      </td>
                    </tr>
                  )
              }
            )
            }

            
          </tbody>
          </table> 

                {
                  OpenUpdatteRole && (
                    <ChangeUserRole
                    onClose={()=> setOpenUpdatteRole(false)}
                    name={UpdateUserDetails.name}
                    email={UpdateUserDetails.email}
                    role={UpdateUserDetails.role}
                    userId={UpdateUserDetails._id}
                    callFunc={fetchAllUsers}
                    ></ChangeUserRole>
                  )
                }

                
          
    </div>
  )

}

export default AllUsers
