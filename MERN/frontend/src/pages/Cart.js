import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js'

const Cart = () => {
  const [Data, setData] = useState([])
  const [Loading, setLoading] = useState(false)

  const loadingCart = new Array(4).fill(null)


  const fetchData = async (e) => {   
 
     const dataResponse = await fetch(SummaryApi.addToCartProductView.url, {
         method: SummaryApi.addToCartProductView.method,
          credentials: "include",
         headers: {
             "content-type" : "application/json"
         },         
     }                
     )
     const dataApi = await dataResponse.json()
 
     if(dataApi.success){
         setData(dataApi.data)        

     }
 
 
 }


 const increaseQty = async (id, qty) => {   
 
  const dataResponse = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
       credentials: "include",
      headers: {
          "content-type" : "application/json"
      },         
      body : JSON.stringify(
        {   
            _id : id,
            quantity : qty + 1
        }
    )
  }                
  )
  const dataApi = await dataResponse.json()

  if(dataApi.success){
      fetchData()        

  }

}

const decreaseQty = async (id, qty) => {   
 
  const dataResponse = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
       credentials: "include",
      headers: {
          "content-type" : "application/json"
      },         
      body : JSON.stringify(
        {   
            _id : id,
            quantity : qty - 1
        }
    )
  }                
  )
  const dataApi = await dataResponse.json()

  if(dataApi.success){
      fetchData()        
  }

}



const deleteCartProduct = async (id, qty) => {   
 
  const dataResponse = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
       credentials: "include",
      headers: {
          "content-type" : "application/json"
      },         
      body : JSON.stringify(
        {   
            _id : id,
        }
    )
  }                
  )
  const dataApi = await dataResponse.json()

  if(dataApi.success){
      fetchData()        
  }

}


 const handleLoading = async (e) => {   
 
await fetchData()

}

const handlePayment = async (e) => {   
   console.log("public key", process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  const dataResponse = await fetch(SummaryApi.payment.url, {
    method: SummaryApi.payment.method,
     credentials: "include",
    headers: {
        "content-type" : "application/json"
    },         
    body : JSON.stringify(
      {   
        cartItems : Data,
      }
  )
}                
)
const dataApi = await dataResponse.json()
  
if(dataApi?.id){
  const stripe = await stripePromise
  stripe.redirectToCheckout({sessionId : dataApi.id})
}

console.log("payment", dataApi)

  }
 


 useEffect(() => {
  setLoading(true)
  handleLoading()
  setLoading(false)
  
 }, [] )



 const totalQty = Data?.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
 const totalPrice = Data?.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
 
  return (
    <div className='container mx-auto'>
      
      <div className='text-center text-lg my-3'>
        {
            Data.length === 0 && !Loading && (
              <p className='bg-white py-5'> No data </p>
            )

        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg-justify-between p-4'>
        
          <div className='w-full max-w-3xl'>
              {
                Loading ? (
                        loadingCart.map((el, index) => {
                          return(
                            <div key={el+"Add To Cart Loading"+index} 
                            className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>  </div>
                          )
                        }
                      )
                ) : (
                  Data?.map((product, index) => {
                    return(
                      <div key={product?._id+"Add To Cart Loading"} 
                      className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]' > 
                        <div className='w-32 h-32 bg-slate-200'>
                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' ></img>
                        </div>

                        <div className='px-4 py-2 relative'>

                            <div className='absolute right-0 text-red-600  rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=> deleteCartProduct(product?._id)}>
                                <MdDelete></MdDelete>
                            </div>
                            
                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>

                            <div className='flex items-center justify-between'>
                            <p className='text-red-600 font-medium text-lg'>{product?.productId?.sellingPrice}</p>
                            <p className='text-slate-600 font-semibold text-lg'>{product?.productId?.sellingPrice * product?.productId?.quantity}</p>
                            </div>

                            <div className='flex items-center gap-3 mt-1'>
                                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id,product?.quantity)} > - </button>
                                  <span>{product?.quantity}</span>                                  
                                  {/* <button onClick={() => increaseQty(product?._id, product?.qty)} className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'> + </button>                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button> */}
                                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                            </div>

                        </div>
                      
                      
                      </div>
                    )
                  }
                )
                )
              }
          </div>

                {
                  Data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {

                            Loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                                      </div>
                            ) : (
                                    <div className='h-36 bg-white'>
                                            <h2 className='text-white bg-red-600 px-4 py-1'>Sumary</h2>

                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                                  <p> Quantity </p>
                                                  <p> {totalQty} </p>
                                              </div>

                                              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                                  <p> Total price </p>
                                                  <p> {totalPrice}</p>
                                              </div>


                                            <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={() => handlePayment()}>Payment</button>
                                      </div>
                            )

                    }

                  </div>
                  )
                }



      </div>

  </div>
  )
}

export default Cart
