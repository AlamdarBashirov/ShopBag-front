import React from 'react'
import style from './WishCard.module.scss'

const WishCard = ({ item, AddBasket, DeleteWishlist }) => {
    return (
        <div className={style.card}>
            <div className={style.info}>
                <div className={style.imageBox}>
                    <img src={item.image} alt={item.title} />
                </div>
                <div className={style.textBox}>
                    <h4>{item.title}</h4>
                    <h5>$ {item.price}</h5>
                </div>
                <div className={style.buttons}>
                    <button onClick={AddBasket} >Add Basket</button>
                    <button onClick={DeleteWishlist} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default WishCard