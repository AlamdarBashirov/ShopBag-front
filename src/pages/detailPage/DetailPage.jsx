import React from 'react'
import style from './DetailPage.module.scss'
import { useLocation } from 'react-router-dom'

const DetailPage = () => {

    const location = useLocation()

    const {item} = location.state

  return (
    <div className={style.section}>
        <div className={style.container}>
            {item ? <div>
                <img src={item.image} alt="" />
                <p>{item.title}</p>
                <p>${item.price}</p>
                <p>${item.description}</p>
            </div> : <p>melumat yoxdur</p>}
        </div>
    </div>
  )
}

export default DetailPage