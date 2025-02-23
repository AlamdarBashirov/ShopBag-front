import React from 'react'
import style from './DetailPage.module.scss'
import { useLocation } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import { postProductsToBasketfromHomeThunk } from '../../redux/reducers/productSlice'

const DetailPage = () => {

  const location = useLocation()

  const dispatch = useDispatch()

  const AddBasket = (item) => {
    dispatch(postProductsToBasketfromHomeThunk(item))
  }

  const { item } = location.state

  return (
    <Layout>

      <div className={style.section}>

        {item ? <div className={style.container}>
          <div className={style.image}>
            <img src={item.image} alt="" />
          </div>
          <div className={style.info}>
            <div className={style.content}>
              <div className={style.title}>
                <h3>Name:</h3>
                <p>{item.title}</p>
              </div>
              <div className={style.description}>
                <h3>Description:</h3>
                <p>{item.description}</p>
              </div>
              <div className={style.size}>
                <h3>Size:</h3>
                <p>{item.size}</p>
              </div>
            </div>
            <div className={style.addCart}>
              <div className={style.price}>
                <h3>Price:</h3>
                <p>${item.price}</p>
              </div>
              <div className={style.cartButton}>
                <button onClick={() => AddBasket(item)}>Add to Cart</button>
              </div>
            </div>

          </div>
        </div> : <p>melumat yoxdur</p>}

      </div>
    </Layout>
  )
}

export default DetailPage