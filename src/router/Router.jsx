import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Basket from '../pages/basket/Basket'
import ManCollegtion from '../pages/categories/manCollegtion/ManCollegtion'
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'
import Register from '../pages/registration/registerPage/Register'
import LoginPage from '../pages/registration/login/LoginPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import PrivateRouter from '../components/privateRouter/PrivateRouter'
import DetailPage from '../pages/detailPage/DetailPage'

const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/categories/man' element={<ManCollegtion />} />
                <Route path='/details' element={<DetailPage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={
                    <PrivateRouter>
                        <ProfilePage />
                    </PrivateRouter>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router