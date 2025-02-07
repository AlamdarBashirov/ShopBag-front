import React, { useEffect, useState } from 'react'
import style from './ManCollegtion.module.scss'
import Layout from '../../../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsManCollegtion } from '../../../redux/reducers/manSlice'
import ManCard from './cards/ManCard'
import { postProductsToBasketThunk } from '../../../redux/reducers/productSlice'

const ManCollegtion = () => {

  const dispatch = useDispatch()

  const products = useSelector((state) => state.manCollegtion.manCollegtion)
  const loading = useSelector((state) => state.manCollegtion.loading)
  const error = useSelector((state) => state.manCollegtion.error)

  const [page, setPage] = useState(1)
  const [productsPage, setProductsPage] = useState(3)

  const lastProductIndex = page * productsPage
  const firstProductIndex = lastProductIndex - productsPage
  const currentProducts = products.slice(firstProductIndex, lastProductIndex)

  let pageNum = []

  for(let i = 1; i <= Math.ceil(products.length / productsPage); i++) {
    pageNum.push(i)
  }

  useEffect(() => {
    dispatch(getProductsManCollegtion())
  }, [])

  const AddBasket = (item) => {
    dispatch(postProductsToBasketThunk(item))
  }

  if (loading) return <div className={style.section}><h1>Yuklenir...</h1></div>
  if (error) return <div className={style.section}><h1>Xeta Bas Verdi</h1></div>
  return (
    <Layout>
      <div className={style.section}>
        <div className={style.container}>
          {currentProducts && currentProducts.map(item=> <ManCard item={item}  AddBasket={() => AddBasket(item)} />)}
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