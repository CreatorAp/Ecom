import React, { useState }  from 'react'
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

    const [ShowPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
const [Data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePic: ""
}
);
const navigate = useNavigate()

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


const handleUploadedPic = async (e) => {
    
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);

    setData((preve)  => {
        return{
            ...preve,
            profilePic: imagePic
        }
    }
)


}


const handleSubmit = async (e) => {
   e.preventDefault();

   if(Data.password === Data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
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
            navigate('/Login')
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
        

        console.log("data", dataApi)
   }
   else {
    console.log("check and confirm password")
   }

}

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>

            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'> 
                <div >
                    <img src={ Data.profilePic || loginIcons} alt='login icons'></img>
                </div>

                <form>
                    <label>
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'> 
                           
                            Upload photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadedPic}></input>
                    </label>
                </form>
            </div>


                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                            <label>
                                Name:
                            </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='text' 
                                name='name'
                                value={Data.name}
                                onChange={handleChange}
                                placeholder='enter namel' 
                                required
                                className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>

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
                                required
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
                                required
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
                                
                        </div>

                        <div>
                            <label>
                                Confirm Password:
                            </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input  type={ShowConfirmPassword ? 'text' : 'password'} 
                                name='confirmPassword'
                                value={Data.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='enter confirm pasword' className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve )}>
                                    <span>
                                        {
                                            ShowConfirmPassword ?
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
                                
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
                </form>
                
                <p className='my-5' >Already have acount ? <Link to={'/Login'} className='text-red-600 hover:text-red-700 hover:underline'> Login </Link></p>
                
            </div>
      
      </div>

    </section>

  )
}

export default SignUp
