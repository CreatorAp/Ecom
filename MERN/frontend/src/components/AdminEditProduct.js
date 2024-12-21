import React, { useState } from 'react'
import productCategory from '../helpers/productCategory'
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import uploadImage from '../helpers/uploadImage';
import { FaCloudUploadAlt } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { CgClose } from "react-icons/cg";

const AdminEditProduct =  ({
  onClose,
  productData,
  fetchData
}) => {

  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")

  const [UploadProductImageInput,setUploadProductImageInput] = useState("")


  const [Data, setData] = useState({
    ...productData,
    productName: productData.productName,
    brandName: productData.brandName,
    category: productData.category,
    productImage: productData.productImage || [],
    description: productData.description,
    price: productData.price,
    sellingPrice: productData.sellingPrice,
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((preve)=> {
      return {
        ...preve,
          [name]: value
      }
    }
  )
  }


  const handleUploadProduct = async(e) => {
      const file = e.target.files[0]
      console.log("Filee", file)
      const uploadImageCloudnary = await uploadImage(file)

    console.log("Cloudnary", uploadImageCloudnary)

    setData((preve)=> {
      return {
        ...preve,
          productImage : [...preve.productImage, uploadImageCloudnary.url]
      }
    }
  )
  }
  


  const handleDeleteProductImage = (index) => {
    console.log("Image index", index)
    
    const newProductImage = [...Data.productImage]
    newProductImage.splice(index, 1)

    setData((preve)=> {
      return {
        ...preve,
          productImage : [...newProductImage]
      }
    }
  )
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

  
      const dataResponse = await fetch(SummaryApi.updateProduct.url, {              
        method: SummaryApi.updateProduct.method,      
        credentials: "include",
        headers: {
          "content-type" : "application/json"
      },
      body: JSON.stringify(Data)
    }                
    )

    const dataApi = await dataResponse.json()

    if(dataApi.success){
    toast.success(dataApi.message)
    onClose()
    fetchData()
    }

}

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>


        <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Edit product</h2>
            <div className='w-fit ml-auto text-2x1 hover:text-red-600 cursor-pointer' onClick={onClose}>
                  <CgClose></CgClose>
            </div>
        </div>


        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name</label>
          <input 
          type='text'
          id='productName'
          placeholder='Enter product name'
          name='productName'
          value={Data.productName}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
          >
          </input>


          <label htmlFor='brandName' className='mt-3'>Brand Name</label>
          <input 
          type='text'
          id='brandName'
          placeholder='Enter brand name'
          name='brandName'
          value={Data.brandName}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
          >
          </input>


<label htmlFor='category' className='mt-3'>category</label>
<select required className='p-2 bg-slate-100 border rounded' value={Data.category} name='category' onChange={handleOnChange}>
                <option value={""}  > Category </option>
                {
                    productCategory.map((el, index) => {
                        return(
                            <option value={el.value} key={el.value+index} > {el.label} </option>
                        )
                    } )
                }

            </select>



                  <label htmlFor='productImage' className='mt-3'>Product Image</label>
                  <label htmlFor='uploadImageInput'>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                      <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'> <FaCloudUploadAlt></FaCloudUploadAlt> </span>                        
                        <p className='text-sm'>Upload product image</p>
                        <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}></input>
                      </div>
                    </div>
                  </label>

<div>
  {
    Data?.productImage[0] ? (
        <div className='flex items-center gap-2'>
          {
            Data.productImage.map((el, index) => {
              return(
                <div className='relative group'>
                  <img
                  src={el}
                  alt={el}
                  width={80}
                  height={80}
                  className='bg-slate-100 border cursor-pointer'
                  onClick={()=> {
                    setOpenFullScreenImage(true)
                    setFullScreenImage(el)
                  } }
                  >
                  </img>

                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=> handleDeleteProductImage(index) }>
                        <MdDelete></MdDelete>
                    </div>

                  </div>
              )
            }
          )
          }
          </div>
    ) : (
      <p>  </p>
    ) 
  }


  </div>


  <label htmlFor='price' className='mt-3'>Price</label>
          <input 
          type='number'
          id='price'
          placeholder='Enter price'
          name='price'
          value={Data.price}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
          >
          </input>

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price</label>
          <input 
          type='number'
          id='sellingPrice'
          placeholder='Enter selling price'
          name='sellingPrice'
          value={Data.sellingPriceprice}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
          >
          </input>

          <label htmlFor='description' className='mt-3'>Description</label>
          <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={Data.description}
              >
              </textarea>



            <button className='px3 py2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload product</button>
        </form>


      </div>

      {
        openFullScreenImage && (
          <DisplayImage onClose={()=> setOpenFullScreenImage(false)} imgUrl={fullScreenImage}></DisplayImage>
        )
      }
    </div>
  )
}

export default AdminEditProduct
