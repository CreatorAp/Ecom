import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Context from '../context'
import addToCart from '../helpers/addToCart'

const VerticalCardProduct = ({category, heading}) => {
const [Data, setData] = useState([])
const [Loading, setLoading] = useState(true)
const loadingList = new Array(13).fill(null)

const [Scroll, setScroll] = useState(0)
const scrollElement = useRef()

const { fetchUserAddToCart } = useContext(Context)
const handleAddToCart = async(e, id)=>{
  await addToCart(e, id)
  fetchUserAddToCart()
}

    const fetchData = async()=>{
        setLoading(true)

        setLoading(false)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setData(categoryProduct?.data)
        console.log("ultimo",categoryProduct?.data)

    }

    useEffect(()=> {
        fetchData()
    }, [] )

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

        const scrollLeft = () => {
            scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className="container mx-auto px-4 my-6 relative">
      
      <h2 className='text-2xl font-semibold py-2'>{heading}</h2>

    <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}> 
    <button  className='bg-white shadow-md rounded-full p-1 absolute left-0'  onClick={scrollLeft}  > <FaAngleLeft></FaAngleLeft></button>
    <button  className='bg-white shadow-md rounded-full p-1 absolute right-0' onClick={scrollRight}><FaAngleRight></FaAngleRight></button>
      {
        Data.map((product, index) => {            
                    return(
                        <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' key={product?._id+index}>

                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' ></img>
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>   {product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-500 font-medium'>   {product?.sellingPrice}</p>
                                <p className='text-slate-500 line-through'>   {product?.price}</p>
                            </div>    
                            <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product._id)}>Add to cart</button>
                        </div>
                
                      </Link>
                    )
            }
        )
      }
      </div>



    </div>
  )
}

export default VerticalCardProduct
