import React from 'react'
import style from './CategoriesSection.module.scss'
import { useNavigate } from 'react-router-dom'

const CategoriesSection = () => {

  const navigate = useNavigate()

  return (
    <div className={style.section}>
      <div className={style.container}>
        <div className={`${style.card} ${style.men}`}>
          <h1>Men's <br />collection</h1>
          <button onClick={() => navigate('/categories/man')}>More</button>
        </div>
        <div className={`${style.card} ${style.women}`}>
          <h1>Women's <br /> collection</h1>
          <button onClick={() => navigate('/categories/woman')}>More</button>
        </div>
        <div className={`${style.card} ${style.baby}`}>
          <h1>Baby's <br />collection</h1>
          <button onClick={() => navigate('/categories/baby')}>More</button>
        </div>
      </div>
    </div>
  )
}

export default CategoriesSection