import React, { useEffect, useState } from 'react'
import style from './ManCollegtion.module.scss'
import Layout from '../../../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsManCollegtion } from '../../../redux/reducers/manSlice'
import ManCard from './cards/ManCard'
import { postProductsToBasketThunk } from '../../../redux/reducers/productSlice'
import { useNavigate } from 'react-router-dom'
import { getCategoriesProductsThunk } from '../../../redux/reducers/categoriesSlice'

const ManCollegtion = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const products = useSelector((state) => state.categories.categories)
  const loading = useSelector((state) => state.categories.loading)
  const error = useSelector((state) => state.categories.error)

  useEffect(() => {
    dispatch(getCategoriesProductsThunk())
  }, [])


  const filteredData = products.filter((product) =>  product.category === "man")
  const [page, setPage] = useState(1)
  const [productsPage, setProductsPage] = useState(16)

  const lastProductIndex = page * productsPage
  const firstProductIndex = lastProductIndex - productsPage
  const currentProducts = filteredData.slice(firstProductIndex, lastProductIndex)

  let pageNum = []

  for (let i = 1; i <= Math.ceil(filteredData.length / productsPage); i++) {
    pageNum.push(i)
  }


  const AddBasket = (item) => {
    dispatch(postProductsToBasketThunk(item))
  }

  const GoDetail = (item) => {
    navigate("/details", { state: { item } })
  }

  if (loading) return <div className={style.section}><h1>Yuklenir...</h1></div>
  if (error) return <div className={style.section}><h1>Xeta Bas Verdi</h1></div>
  return (
    <Layout>
      <div className={style.section}>
        <div className={style.container}>
          {currentProducts && currentProducts.map(item => <ManCard item={item} AddBasket={() => AddBasket(item)} GoDetail={() => GoDetail(item)}/>)}
        </div>
        <div>
          {pageNum && pageNum.map(item => {
            return <button onClick={() => setPage(item)} >{item}</button>
          })}
        </div>
      </div>
    </Layout>
  )
}

export default ManCollegtion