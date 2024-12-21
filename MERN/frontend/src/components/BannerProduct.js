import React, { useEffect, useState } from 'react'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import  image1  from '../assest/banner/Banner1.jpg'
import  image2  from '../assest/banner/Banner2.jpg'
import  image3  from '../assest/banner/Banner3.jpg'
import  image4  from '../assest/banner/Banner4.jpg'

const BannerProduct = () => {

        const [CurrentImage, setCurrentImage] = useState(0)

        const desktopImages = [
            image1,
            image2,
            image3,
            image4
        ]

        const nextImage = () => {
            if(desktopImages.length -1 > CurrentImage){
                setCurrentImage(preve => preve + 1)
            }
        }

        const preveImage = () => {
            if(CurrentImage != 0){
                setCurrentImage(preve => preve - 1)
            }
        }
        
        useEffect(() => {
                const interval = setInterval(()=>{
                 if(desktopImages.length -1 > CurrentImage){
                    nextImage()
                } else{
                        setCurrentImage(0)
                }
                }, 5000)

                return ()=> clearInterval(interval)
        } ,[CurrentImage]  )
  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-2xl'>
                <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft></FaAngleLeft></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight></FaAngleRight></button>
            </div>
        </div>

        <div className='hidden md:flex w-full h-full overflow-hidden'>
                {
                        desktopImages.map((imageUrl, index) => {
                            return(
                               <div className='w-full h-full min-w-full min-h-full' style={{transform : `translateX(-${CurrentImage * 100}%)`}} >
                                <img src={imageUrl} className='w-full h-full'></img>
                                </div>
                            )
                        }
                        )
                }
        </div>

        </div>
    </div>
  )
}

export default BannerProduct
