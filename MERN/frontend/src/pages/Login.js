import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
const [ShowPassword, setShowPassword] = useState(false);
const [Data, setData] = useState({
    email: "",
    password: ""
}
);

const navigate = useNavigate()
const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

const handleChange = (e) => {
    const {name, value } = e.target;

    setData((preve)  => {
        return{
            ...preve,
            [name]: value
        }
    }
)

}


const handleSubmit = async (e) => {
   e.preventDefault();
var teste = SummaryApi.signIn.url;
    const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
         credentials: "include",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Data)
    }                
    )
    const dataApi = await dataResponse.json()

    if(dataApi.success){
        toast.success(dataApi.message)        
        navigate('/')
        fetchUserDetails()
        fetchUserAddToCart()
    }

    if(dataApi.error){
        toast.error(dataApi.message)
    }

}

console.log("data login", Data);
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>

                <div className='w-20 h20 mx-auto'>
                    <img src={loginIcons} alt='login icons'></img>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>
                                Email:
                            </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='email' 
                                name='email'
                                value={Data.email}
                                onChange={handleChange}
                                placeholder='enter email' 
                                className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>

                        <div>
                            <label>
                                Password:
                            </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input  type={ShowPassword ? 'text' : 'password'} 
                                name='password'
                                value={Data.password}
                                onChange={handleChange}
                                placeholder='enter pasword' className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve )}>
                                    <span>
                                        {
                                            ShowPassword ?
                                            (
                                                <FaEye />
                                            )
                                            :
                                            (
                                                <FaRegEyeSlash />
                                            )
                                        }
                                        
                                        
                                    </span>
                                </div>
                            </div>
                                <Link to='/ForgotPassword'></Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                
                <p className='my-5' >Dont have acount ? <Link to={'/sign-up'} className='text-red-600 hover:text-red-700 hover:underline'> Sign up </Link></p>
                
            </div>
      
      </div>

    </section>

  )
}

export default Login
