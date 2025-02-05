import React from 'react'
import style from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div>
            <ul>
              <li><a href="">Phone</a></li>
              <li><a href="">Insta</a></li>
              <li><a href="">Face</a></li>
              <li><a href="">Adress</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer