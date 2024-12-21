import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      Home
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>

      <HorizontalCardProduct category={'airpodes'} heading={'Tops Airpods'}></HorizontalCardProduct>

      <HorizontalCardProduct category={'mobiles'} heading={'Tops mobiles'}></HorizontalCardProduct>

      <VerticalCardProduct category={'mobiles'} heading={'Tops mobiles'}></VerticalCardProduct>

      <VerticalCardProduct category={'refrigerator'} heading={'Tops refrigerator'}></VerticalCardProduct>

      <VerticalCardProduct category={'televisions'} heading={'Tops televisions'}></VerticalCardProduct>

      <VerticalCardProduct category={'camera'} heading={'Tops camera'}></VerticalCardProduct>
    </div>
  )
}

export default Home
