import React from 'react'
import style from './WomanCard.module.scss'

const WomanCard = ({item, AddBasket, GoDetail}) => {
  return (
    <div className={style.card}>
        <img src={item.image} alt={item.title} />
        <p>{item.title}</p>
        <p>${item.price}</p>
        <div className={style.buttons}>
            <button onClick={AddBasket}>Add Basket</button>
            <button onClick={GoDetail}>Details</button>
        </div>
    </div>
  )
}

export default WomanCard