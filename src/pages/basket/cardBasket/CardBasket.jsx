import React from 'react'
import style from './CardBasket.module.scss'

const CardBasket = ({ item, DeleteFromBasket, DecreaseCount, IncreaseCount, GoDetail }) => {

  const sum = item.count * item.price

  return (
    <div className={style.card}>
      <div className={style.info}>
        <div className={style.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={style.administerBox}>
          <div className={style.details} onClick={GoDetail}>
            <p>name: {item.title}</p>
            <p>price: ${item.price}</p>
            <p>Size: {item.size}</p>
          </div>
          <div className={style.buttons}>
            <div className={style.countTable}>
              <button onClick={DecreaseCount} className={style.countBtn} >-</button>
              <p className={style.count}>{item.count}</p>
              <button onClick={IncreaseCount} className={style.countBtn}>+</button>
            </div>
            <div className={style.delButtons}>
              <button onClick={DeleteFromBasket} className={style.deleteBtn}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.cost}>
        <h2>Total Price of the Products: ${sum}</h2>
      </div>
    </div>
  )
}

export default CardBasket