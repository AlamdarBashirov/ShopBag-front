import React from 'react'
import Layout from '../../components/layout/Layout'
import IntroSection from './sections/introSection/IntroSection'
import CategoriesSection from './sections/categoriesSection/CategoriesSection'

const Home = () => {
  return (
    <Layout>
        <IntroSection/>
        <CategoriesSection/>
    </Layout>
  )
}

export default Home