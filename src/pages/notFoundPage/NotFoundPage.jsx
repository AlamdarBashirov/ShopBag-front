import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './NotFoundPage.module.scss'
import Layout from '../../components/layout/Layout'

const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <Layout>
            <div className={style.section}>
                <h1>Error 404. Not Found Page</h1>
                <button onClick={() => navigate("/")}>Go Home</button>
            </div>
        </Layout>
    )
}

export default NotFoundPage