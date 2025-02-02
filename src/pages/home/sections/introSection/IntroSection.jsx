import React, { useEffect, useState } from 'react'
import style from './IntroSection.module.scss'

const IntroSection = () => {
    
    return (
        <div className={style.section}>
            <div className={style.container}>
                <div className={style.textBox}>
                    <h1>Sizə lazım olan hərşey</h1>
                    <p>Yeni görünüş, yeni stil</p>
                    <button>İNDİ AL</button>
                </div>
            </div>
        </div>
    )
}

export default IntroSection