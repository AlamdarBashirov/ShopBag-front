import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './NotFoundPage.module.scss'
import Layout from '../../components/layout/Layout'
import Lottie from 'lottie-react'
import notFound from '../../components/assets/animations/Main Scene.json'

const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <Layout>
            <div className={style.section}>
                <Lottie animationData={notFound} className={style.animation}/>
                {/* <button onClick={() => navigate("/")}>Go Home</button> */}
            </div>
        </Layout>
    )
}

export default NotFoundPage