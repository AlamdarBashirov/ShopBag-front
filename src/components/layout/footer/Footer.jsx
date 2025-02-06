import React from 'react'
import style from './Footer.module.scss'
import logo from '../../assets/images/logo-white-theme.png'
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.headOfFooter}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={style.slogan}>
          <h1>Size Lazim Olan Hersey</h1>
        </div>
        <div className={style.iconBox}>
          <FaInstagram />
          <FaFacebookF />
          <FaXTwitter />
          <FaLinkedinIn />
        </div>
      </div>
      <div className={style.container}>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div className={style.headingComponents}>
            <ul>
              <li><a href="">Phone</a></li>
              <li><a href="">Insta</a></li>
              <li><a href="">Face</a></li>
              <li><a href="">Adress</a></li>
            </ul>
          </div>
        </div>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div className={style.headingComponents}>
            <ul>
              <li><a href="">Phone</a></li>
              <li><a href="">Insta</a></li>
              <li><a href="">Face</a></li>
              <li><a href="">Adress</a></li>
            </ul>
          </div>
        </div>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div className={style.headingComponents}>
            <ul>
              <li><a href="">Phone</a></li>
              <li><a href="">Insta</a></li>
              <li><a href="">Face</a></li>
              <li><a href="">Adress</a></li>
            </ul>
          </div>
        </div>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div className={style.headingComponents}>
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