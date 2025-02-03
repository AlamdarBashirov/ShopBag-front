import React from 'react'
import Layout from '../../components/layout/Layout'
import IntroSection from './sections/introSection/IntroSection'
import PopularProductsSection from './sections/popularProductsSection/PopularProductsSection'
import CategoriesSection from './sections/categoriesSection/CategoriesSection'

const Home = () => {
  return (
    <Layout>
        <IntroSection/>
        <PopularProductsSection/>
        <CategoriesSection/>
    </Layout>
  )
}

export default Home