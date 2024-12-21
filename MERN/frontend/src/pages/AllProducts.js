import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

  const[OpenUploadProduct, setOpenUploadProduct] = useState(false)
  const[AllProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const dataResponse = await fetch(SummaryApi.allProduct.url)                
  
    const dataApi = await dataResponse.json()

    console.log("User data", dataApi)

    setAllProduct(dataApi?.data || [])
}

useEffect(()=>{
  fetchAllProduct()
},[] )
  return (
    <div>
      
      <div className='bg-white py-2 px-4 flex justify-between items bg-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload product</button>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          AllProduct.map((product, index)  => {
              return (
                <AdminProductCard data={product} fetchData={fetchAllProduct} ></AdminProductCard>

              )
          }
          )
        }
        </div>

        {
          OpenUploadProduct && (
            <UploadProduct onClose={() => setOpenUploadProduct(false)}  fetchData={fetchAllProduct}></UploadProduct>
          )
        }

    </div>
  )
}

export default AllProducts
