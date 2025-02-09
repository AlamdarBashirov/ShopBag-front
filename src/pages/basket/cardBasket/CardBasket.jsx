import React from 'react'
import style from './CardBasket.module.scss'

const CardBasket = ({ item, DeleteFromBasket,DecreaseCount, IncreaseCount, GoDetail }) => {

  const sum = item.count * item.price

  return (
    <div className={style.card}>
      <div className={style.info}>
        <img src={item.image} alt={item.title} />
        <div className={style.details} onClick={GoDetail}>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <p>Ölçü: {item.size}</p>
        </div>
        <div className={style.countTable}>
          <button onClick={DecreaseCount}>-</button>
          <p className={style.count}>{item.count}</p>
          <button onClick={IncreaseCount}>+</button>
        </div>
        <div className={style.buttons}>
          <button onClick={DeleteFromBasket}>Delete</button>
        </div>
      </div>
      <div className={style.cost}>
        <h2>Məhsulun ümumi qiyməti: ${sum}</h2>
      </div>
    </div>
  )
}

export default CardBasket