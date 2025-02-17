import React from 'react'
import style from './PopularCard.module.scss'

const PopularCard = ({item, AddBasket, AddWishlist}) => {
  return (
    <div>
        <img src={item.image} alt={item.title} />
        <p>{item.title}</p>
        <p>${item.price}</p>
        <div className={style.buttons}>
            <button onClick={AddBasket}>INDI AL</button>
            <button onClick={AddWishlist}>Wish</button>
        </div>
    </div>
  )
}

export default PopularCard