import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assest/image.png'


const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
    <img src={image} width={150} height={150} ></img>

    <p className='text-green-600 text-bold text-xl'>Payment Success</p>
    <Link to={'/order'} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See order</Link>
      
    </div>
  )
}

export default Success
