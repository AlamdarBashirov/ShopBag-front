import React, { useEffect, useState } from 'react'
import style from './IntroSection.module.scss'

const IntroSection = () => {
    
    return (
        <div className={style.section}>
            <div className={style.container}>
                <div className={style.textBox}>
                    <h1>The fashion you are looking for is here.</h1>
                    <p>New look, new style</p>
                </div>
            </div>
        </div>
    )
}

export default IntroSection