import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalProductCard from '../components/VerticalProductCard'

const SearchProduct = () => {
    const [Data, setData] = useState([])
    const query = useLocation()
    const [Loading, setLoading] = useState(false)

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)

        const dataResponse = await response.json()

        setLoading(false)
        
        setData(dataResponse.data)

        console.log("dataResponse", dataResponse)
    }

    useEffect(() => {
        fetchProduct()
    }, [query]    )

    console.log("query", query.search)
  return (
    <div className='container mx-auto p-4'>
      {
            Loading && (
                <p className='text-lg text-center'>Loading...</p>
            )
      }

        <p className='text-lg font-semibold my-3'> Search results: {Data.length} </p>

        {
               Data?.length === 0 && !Loading && (
                    <p className='bg-white text-lg text-center p-4'>No data found...</p>
                )
        }

        {
                Data?.length !== 0 &&  !Loading && (
                    <VerticalProductCard loading={Loading} Data={Data} ></VerticalProductCard>
                )
        }




    </div>

    
  )
}

export default SearchProduct
