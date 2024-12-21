import React, { useState } from 'react'
import AdminEditProduct from './AdminEditProduct'
import { MdModeEditOutline } from "react-icons/md"
import displayCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({
    data,
    fetchData
}) => {

    const [EditProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white p4 rounded'>
        <div className='w-40'>
            
            <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} width={120} height={120} className='w-fit mx-auto object-fill h-full'></img>
            </div>
        
        <h2 className='text-ellipsis line-clamp-2'>{data.productName}</h2>

        <div>
        <div>
            {
                displayCurrency(data.sellingPrice)
            }
        {/* {data.sellingPrice} */}
        </div>

        <div className='w-fit ml-auto p-2  bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
        <MdModeEditOutline></MdModeEditOutline>
        </div>
        </div>


        </div>


{
        EditProduct && (
            <AdminEditProduct productData={data} onClose={()=> setEditProduct(false)} fetchData={fetchData} ></AdminEditProduct>
        )
        
}
    
    </div>


  )
}

export default AdminProductCard
