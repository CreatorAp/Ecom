import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const OrderPage = () => {
    
    const [Data, setData] = useState([])

    const fetchOrderDetails = async () => {
        const dataResponse = await fetch(SummaryApi.getOrder.url, {          
          method: SummaryApi.getOrder.method,      
          credentials: "include"
      })                
      
      const dataApi = await dataResponse.json()
    console.log("testado", dataApi.data)
      setData(dataApi.data)
            
      }

      useEffect(() => {
        fetchOrderDetails()
      },{} )

  return (
    <div>
      {/* [

      ] */}

      <div className="p-4 w-full">
        {
            Data.map((item, index)=>{
                return(
                    <div key={item.userId+index}>
                     <p className='font-medium text-lg'> {item.createdAt} </p>   
                     <div className='border rounded'>

                       <div className='flex flex-col lg:flex-row justify-between'>

                        <div className='grid gap-1'>
                            {
                                            item?.productDetails.map((product, index)=>{
                                                
                                                return(
                                                  <div className='flex  gap-3 bg-slate-100'>
                                                    <img src={product?.image[0]} className='w-28 h-28 bg-slate-200 object-scale-down p-2'></img>

                                                        <div>
                                                            
                                                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}    </div>
                                                                
                                                            <div className='flex items-center gap-5 mt-1'>
                                                                
                                                                <div className='text-lg text-red-500'>  {product.price} </div>
                                                                <p > Quantity : {product.quantity} </p>    

                                                             </div>

                                                        </div>
                                                    </div>      
                                                )
                                            }
                                        )
                            }
                            </div>

                                <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                                    <div className='text-lg font-medium'>
                                        <div className='text-lg font-medium'> Payment details : </div>
                                        <p className='ml-1'> Payment method: {item.paymentDetails.payment_method_type[0]} </p>
                                        <p className='ml-1'> Payment status : {item.paymentDetails.payment_status} </p>
                                    </div>    

                                    <div>
                                    <div className='text-lg font-medium'> Shipping details :  </div>    
                                    {
                                            item?.shipping_options.map((shipping, index)=>{                                                
                                                return(
                                                        <div className='ml-1' key={shipping.shipping_rate}>
                                                                Shipping amount : {shipping.shipping_amount}
                                                            </div>
                                                )
                                            }
                                            )
                                    }
                                    </div>    
                                </div>    

                        </div>


                            <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                Totaal amount : {item.totalAmount}
                                </div>

                        </div>

                     </div> 
                )
            }

            )
        } 

      </div>
    </div>
  )
}

export default OrderPage
