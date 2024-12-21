import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const [CategoryProduct, SetCategoryProduct] = useState([])
    const [Loading, SetLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async()=>{
        SetLoading(true)
        const dataResponse = await fetch(SummaryApi.categoryProduct.url)   
        const data = await dataResponse.json()
        SetLoading(false)
        SetCategoryProduct(data.data)
    }
    
      useEffect(() => {
        fetchCategoryProduct()
      },{} )

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            Loading ? (
                categoryLoading.map((el, index)=> {
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'>

                            </div>
                    )
                }
            )  
            ) :
            (
                CategoryProduct.map((product, index)=> {
                    return(
                              
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={product?.productImage[0]} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' ></img>
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                    )
                }
            )  
            )
        }
      </div>
    </div>
  )
}

export default CategoryList
