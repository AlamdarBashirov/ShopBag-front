import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import style from './Header.module.scss'
import logoWhite from '../.././assets/images/logo-white-theme.png'
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.container}>
                <div className={style.burgerMenu}>
                    <RxHamburgerMenu />
                </div>
                <div className={style.logoBox}>
                    <Link to='/'>
                        <img src={logoWhite} alt="" />
                    </Link>
                </div>
                <div className={style.navigation}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="">Home</a></li>
                        <li><a href="">Home</a></li>
                        <li><a href="">Home</a></li>
                        <li><a href="">Home</a></li>
                        <li><a href="">Home</a></li>
                    </ul>
                </div>
                <div className={style.headerActions}>
                    <Link to='/profile'>
                        <FaRegUser />
                    </Link>
                    <FaRegHeart />
                    <Link to='/basket'>
                        <RiShoppingCartLine />
                    </Link>
                </div>
            </div>
            <div className={style.bottomHeader}>
                <div className={style.bottomContainer}>
                    <div className={style.categories}>
                        <ul>
                            <li><a href="/categories/man">man</a></li>
                            <li><a href="">woman</a></li>
                            <li><a href="">baby</a></li>
                        </ul>
                    </div>
                    <div className={style.search}>
                        <input type="text" placeholder='axtar' />
                        <button className={style.searchButton}>
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header