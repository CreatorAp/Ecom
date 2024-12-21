import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assest/card-payment-cancel.png'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
    <img src={image} width={150} height={150} ></img>

    <p className='text-red-600 text-bold text-xl'>Payment cancel</p>
    <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go to cart</Link>
      
    </div>
  )
}

export default Cancel
