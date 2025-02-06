import React from 'react'
import style from './PopularCard.module.scss'

const PopularCard = ({item}) => {
  return (
    <div>
        <img src={item.image} alt={item.title} />
        <p>{item.title}</p>
        <p>${item.price}</p>
        <div className={style.buttons}>
            <button>INDI AL</button>
        </div>
    </div>
  )
}

export default PopularCard