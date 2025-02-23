import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import style from './Header.module.scss'
import logoWhite from '../.././assets/images/logo-white-theme.png'
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const Header = ({ setText }) => {  // setText prop olarak alınıyor
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    
    return (
        <div className={style.header}>
            <div className={style.container}>
                <div className={style.burgerMenu}>
                    <button onClick={toggleDrawer}><RxHamburgerMenu /></button>
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <ul className={style.burgerNav}>
                            <h1>Categories</h1>
                            <li><a href="/categories/man">man</a></li>
                            <li><a href="/categories/woman">woman</a></li>
                            <li><a href="/categories/baby">baby</a></li>
                        </ul>
                    </Drawer>
                </div>
                <div className={style.logoBox}>
                    <Link to='/'>
                        <img src={logoWhite} alt="" />
                    </Link>
                </div>
                <div className={style.navigation}>
                    <div className={style.search}>
                        <input type="text" placeholder='axtar' onChange={(e) => setText(e.target.value)} />
                        <button className={style.searchButton}>
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </div>
                <div className={style.headerActions}>
                    <Link to='/profile'>
                        <FaRegUser />
                    </Link>
                    <Link to='/wishlist'>
                        <FaRegHeart />
                    </Link>
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
                            <li><a href="/categories/woman">woman</a></li>
                            <li><a href="/categories/baby">baby</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
