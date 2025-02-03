import React, { useRef } from 'react'
import style from './popularProductsSection.module.scss'
import test_picture from '../../../../components/assets/images/intro-background-clothes-women.jpg'

const PopularProductsSection = () => {
    const cardBoxRef = useRef(null); // cardBox üçün referans yaradırıq

    const scrollLeft = () => {
        if (cardBoxRef.current) {
            cardBoxRef.current.scrollBy({ left: -cardBoxRef.current.clientWidth / 4, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (cardBoxRef.current) {
            cardBoxRef.current.scrollBy({ left: cardBoxRef.current.clientWidth / 4, behavior: "smooth" });
        }
    };

    return (
        <div className={style.section}>
            <div className={style.sectionName}>
                <h1>Populyar Məhsullar</h1>
            </div>
        <div className={style.container}>
        <button className={style.scrollButton} onClick={scrollLeft}>{"<"}</button>
            <div className={style.cardBox} ref={cardBoxRef}>
                {Array(10).fill(null).map((_, index) => (
                    <div key={index} className={style.card}>
                        <img src={test_picture} alt="" />
                        <p>coat</p>
                        <p>$45.55</p>
                        <button>İndi Al</button>
                    </div>
                ))}
            </div>
        <button className={style.scrollButton} onClick={scrollRight}>{">"}</button>
        </div>
    </div>
    )
}

export default PopularProductsSection