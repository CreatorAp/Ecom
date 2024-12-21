import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const[MenuDisplay, setMenuDisplay] = useState(false)

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const context = useContext(Context)

  const searchInput = useLocation()

  const handleLogout = async () => {
    const dataResponse = await fetch(SummaryApi.logout_user.url, {          
      method: SummaryApi.logout_user.method,      
      credentials: "include"
  })                
  
  const dataApi = await dataResponse.json()

if(dataApi.success){
  toast.success(dataApi.message)
  dispatch(setUserDetails(null))
  navigate('/')
}

if(dataApi.error){
  toast.error(dataApi.message)
}

  }


  const handleSearch = async (e) => {
      const {value} = e.target

      if(value) {
        navigate(`search?q=${value}`)
      }
      else{
        navigate("/search")
      }
      
  }

console.log("count", context?.CartProductCount)

  return (
<header className='h-16 shadow-md bg-white fixed w-full z-40'>

  <div className='h-full container mx-auto flex items-center px-4 justify-between'>

    <div className=''>
      <Link to="/">
        <Logo w={90} h={50}></Logo>
      </Link>
    </div>

  <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
    <input type='text' placeholder='Search products here' className='w-full outline-none' onChange={handleSearch}></input>
    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
    <CiSearch></CiSearch>
    </div>
  </div>

    <div className='flex items-center gap-7'>

      <div className='relative flex justify-center'>

      {
        user?._id && (
          <div className='text-3x1 cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
            { user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full'  alt={user?.name} ></img>
            ) : (
              <FaRegCircleUser></FaRegCircleUser>
            )
          
            }
          </div>
        )
      }


        {
          MenuDisplay && (
        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>

          <nav>
            {
              user?.role == ROLE.ADMIN && (
                <Link to="/admin-panel" className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}> Admin panel </Link>
              )
            }

          </nav>
        </div>
        )
        }


      </div>

          {
            user?._id && (
              <Link to={'/cart'} className='text-2x1 relative'>
              <span>      <FaShoppingCart></FaShoppingCart></span>
              <div className='bg-red-600 text-white w5 h5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.CartProductCount}</p>
              </div>
      
            </Link>
            )
          }


      <div>
        {
          user?._id ? (
            <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
          ) : 
          (
            <Link to="/Login" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' onClick={() => setMenuDisplay(preve => !preve)} >Login</Link>
          )

        }

        
      </div>
    </div>



  </div>

</header>
  )
}

export default Header
