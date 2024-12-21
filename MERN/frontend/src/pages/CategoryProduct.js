import React, { useEffect, useState } from 'react'
import productCategory from '../helpers/productCategory'
import VerticalProductCard from '../components/VerticalProductCard'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'

function CategoryProduct() {

  const [Data, setData] = useState([])
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListinObject = {}

  urlCategoryListinArray.forEach(el =>{
    urlCategoryListinObject[el] = true
  }
  )

  const [SelectCategory, setSelectCategory] = useState(urlCategoryListinObject)
  const [FilterCategoryList, setFilterCategoryList] = useState([])
  const [SortBy, setSortBy] = useState("")

  
  const fetchData = async (e) => {   
 
    const dataResponse = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
         credentials: "include",
        headers: {
            "content-type" : "application/json"
        },    
        body : JSON.stringify({
          category : FilterCategoryList
        })
    }                
    )
    const dataApi = await dataResponse.json()
    
        setData(dataApi?.data || [])     

}

const handleSelectCategory = (e) => {   
  const { name, value, checked } = e.target

  setSelectCategory((preve)=> {
    return{
      ...preve,
        [value]: checked
    }
  }
)
}

useEffect(()=> {
    fetchData()
} , [FilterCategoryList] )

useEffect(()=> {
  const arrayOfCategory = Object.keys(SelectCategory).map(categoryKeyName => {
    if(SelectCategory[categoryKeyName]){
        return categoryKeyName
    }
    return null
  }
  ).filter(el => el)

  setFilterCategoryList(arrayOfCategory)

  const urlFormat = arrayOfCategory.map((el, index) => {
    if( (arrayOfCategory.length -1) === index ){
        return `category${el}`
    }
    return `category${el}&&`
  }
  )

navigate("/product-category?"+urlFormat.join(""))
} , [SelectCategory] )

useEffect(()=> {
  
} , [SortBy] )

const handleOnChangeSortBy = (e) => {   
  const { value } = e.target

  setSortBy(value)
 
  if(value === "asc"){
    setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
  }

  if(value === "desc"){
    setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
  }
}


  return (
    <div className='container mx-auto p-4'>
          <div className='hidden lg:grid grid-cols-[200px,1fr]'>
      

            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
        
              <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' checked={SortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}></input>
                      <label >Price low to high</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input  type='radio' name='sortBy' checked={SortBy === 'desc'} onChange={handleOnChangeSortBy} value={"desc"}></input>
                      <label>Price high to low</label>
                    </div>
                    </form>
          

              </div>

              <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                    
                      {
                        productCategory.map((categoryName, index) => {
                          return(
                            <div className='flex items-center gap-3'>
                               <input type='checkbox' name={"category"} checked={SelectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                               <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                          )
                        }                      
                      )
                      }
                    </form>
          

              </div>

             </div>
        

              <div className='px-4'>
                            <p className='font-medium text-slate-800 text-lg my-2'>Search results: {Data.length}</p> 
                            
                            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                              
                            {
                                Data?.length !== 0 &&  !Loading && (
                                    <VerticalProductCard loading={Loading} Data={Data} ></VerticalProductCard>
                                )
                            }
                            </div>
              </div>

            
      

          </div>


    </div>

//     <div className='container mx-auto p-4'>

//     {/***desktop version */}
//     <div className='hidden lg:grid grid-cols-[200px,1fr]'>
//         {/***left side */}
//         <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
//              {/**sort by */}
//              <div className=''>
//                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

//                  <form className='text-sm flex flex-col gap-2 py-2'>
//                      <div className='flex items-center gap-3'>
//                        <input type='radio' name='sortBy' checked={SortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
//                        <label>Price - Low to High</label>
//                      </div>

//                      <div className='flex items-center gap-3'>
//                        <input type='radio' name='sortBy' checked={SortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
//                        <label>Price - High to Low</label>
//                      </div>
//                  </form>
//              </div>


//              {/**filter by */}
//              <div className=''>
//                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

//                  <form className='text-sm flex flex-col gap-2 py-2'>
//                      {
//                        productCategory.map((categoryName,index)=>{
//                          return(
//                            <div key={"Add To Cart Loading"+index}  className='flex items-center gap-3'>
//                               <input type='checkbox' name={"category"} checked={SelectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
//                               <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                            </div>
//                          )
//                        })
//                      }
//                  </form>
//              </div>


//         </div>


//          {/***right side ( product ) */}
//          <div className='px-4'>
//            <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {Data.length}</p>

//            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
//                             {
//                                  Data?.length !== 0 &&  !Loading && (
//                                  <VerticalProductCard loading={Loading} Data={Data} ></VerticalProductCard>
//                                  )
//                              }
//                              </div>
//          </div>
//     </div>
    
//  </div>

  )
}

export default CategoryProduct
