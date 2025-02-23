import React from 'react'
import style from './Footer.module.scss'
import logo from '../../assets/images/logo-white-theme.png'
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div className={style.iconBox}>
          <FaInstagram />
          <FaFacebookF />
          <FaXTwitter />
          <FaLinkedinIn />
        </div>
        <div className={`${style.heading}`}>
          <div className={style.headingName}>
            <h4>Fashions</h4>
          </div>
          <div className={style.headingComponents}>
            <ul>
              <li><a href="/man">MAN</a></li>
              <li><a href="/woman">WOMAN</a></li>
              <li><a href="/baby">BABY</a></li>
            </ul>
          </div>
        </div>
        <div className={`${style.heading} ${style.contactUs}`}>
          <div className={style.headingName}>
            <h4>Contact Us</h4>
          </div>
          <div className={style.headingComponents}>
            <ul>
              <li><a href="+994505165870"><FaPhoneAlt /> +994 50 516 58 70</a></li>
              <li><a href="alamdarzb-sp202@code.edu.az"><IoMail /> alamdarzb-sp202@code.edu.az</a></li>
              <li><a href="https://www.google.com/maps/place/Sumgait+State+University/@40.5644766,49.7010466,13.09z/data=!4m6!3m5!1s0x4030912b2cbbf477:0x6acc6600f49ba00e!8m2!3d40.5749732!4d49.6778627!16zL20vMGNuZnZy?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"><FaLocationDot />  Sumgait State University</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer