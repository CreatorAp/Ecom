import React, { useCallback, useContext, useEffect, useState } from 'react'
import displayCurrency from '../helpers/displayCurrency'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import SummaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import Context from '../context';
import addToCart from '../helpers/addToCart';

function ProductDetails() {

    const [Data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    }
    )

    const navigate = useNavigate()
    const params = useParams()
    const fetchProductDetails = async()=>{
        const response = await fetch(SummaryApi.productDetails.url,{
            method : SummaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId : params?.id
            })
        })
    
        setLoading(false)
        const dataResponse = await response.json()
    
        setData(dataResponse?.data) 
        setActiveImage(dataResponse?.data?.productImage[0])
    }

    useEffect(() => {
        fetchProductDetails()
    }, [params]    )

    const [ActiveImage, setActiveImage] = useState("")
    const [ZoomImage, setZoomImage] = useState(false)    
    const [ZoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    }
    )
    const [Loading, setLoading] = useState(false)        
    const productImageListLoading = new Array(13).fill(null)


    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const {left, top, width, height} = e.target.getBoundingClientRect()

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height


        setZoomImageCoordinate({
            x,
            y
        })
    }, [ZoomImageCoordinate]   )

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }





    const handleMouseEnterProduct = (imageUrl) => {
        setActiveImage(imageUrl)
    }

    const { fetchUserAddToCart } = useContext(Context)

    const handleBuyProduct = async (e, id) => {
        // setActiveImage()
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate('/cart')
    }

    // const handleAddToCart = () => {
    //     setActiveImage()
    // }
    

    const handleAddToCart = async(e, id)=>{
    await addToCart(e, id)
    fetchUserAddToCart()
    }
 
  return (
    <div className='container mx-auto p-4'>
      ProductDetails

        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 '>

            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                <img src={ActiveImage} className='h-full w-full object-scale-down mix-blend-multiply' 
                onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}></img>                
                {
                    ZoomImage && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                            <div
                             className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                             style={{
                                background : `url(${ActiveImage})`,
                                backgroundRepeat : 'no-repeat',
                                backgroundPosition : `${ZoomImageCoordinate.x * 100}% ${ZoomImageCoordinate.y * 100}% `
      
                              }}
  
                             >
                            
                            </div>
                        </div>
                    )
                }

                </div>
            
            <div className='h-full'>
                    {
                            Loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'> 
                                        {
                                            productImageListLoading.map((el, index) => {
                                                return(
                                                   <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>

                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                            ) : (
                                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                        {
                                                Data?.productImage?.map((imgUrl, index) => {
                                                        return(
                                                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgUrl}>
                                                                <img src={imgUrl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                                                                onMouseEnter={()=> handleMouseEnterProduct(imgUrl)}  ></img>
                                                            </div>
                                                        )
                                                }
                                                )
                                        }

                                    </div>
                            )


                    }
              </div>

            </div>


            {
                Loading ? (                             
                    <div className='grid gap-1 w-full'>
                    <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                    <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                    <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>
    
                    <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
        
                    </div>
    
                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                      <p className='text-red-600 bg-slate-200 w-full'></p>
                      <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                    </div>
    
                    <div className='flex items-center gap-3 my-2 w-full'>
                      <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                      <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                    </div>
    
                    <div className='w-full'>
                      <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                      <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                    </div>
                  </div>              
                ) : (
                    <div className='flex flex-col gap-1'>
                    <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{Data?.brandName}</p>
                    <h2 className='text-2xl lg:text-4xl font-medium'>{Data?.productName}</h2>
                    <p className='capitalize text-slate-400'>{Data?.category}</p>    
                    <div className='text-red-600 flex items-center gap-1'>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStarHalf/>
                    </div>    
                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                      <p className='text-red-600'>{displayCurrency(Data?.sellingPrice)}</p>
                      <p className='text-slate-400 line-through'>{displayCurrency(Data?.price)}</p>
                    </div>    
                    <div className='flex items-center gap-3 my-2'>
                      <button 
                      className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' 
                      onClick={(e)=>handleBuyProduct(e,Data?._id)}>Buy</button>
                      <button 
                      className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' 
                      onClick={(e) => handleAddToCart(e, Data?._id)}>Add To Cart</button>
                    </div>    
                    <div>
                      <p className='text-slate-600 font-medium my-1'>Description : </p>
                      <p>{Data?.description}</p>
                    </div>
                  </div>         
                )
            }

            
            </div>
            
                {
                    Data?.category && (
                        // <VerticalCardProduct category={Data?.category} heading={"Recomended products"}></VerticalCardProduct>
                        <CategoryWiseProductDisplay category={Data?.category} heading={"Recomended products"}></CategoryWiseProductDisplay>
                    )
                }
                

        </div>

   
  )
}

export default ProductDetails
