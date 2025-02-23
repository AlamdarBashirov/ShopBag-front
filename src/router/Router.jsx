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
import PaymentPage from '../pages/paymentPage/PaymentPage'
import PaymentSuccesPage from '../pages/paymentPage/paymentSuccess/PaymentSuccesPage'
import WishlistPage from '../pages/wishlistPage/WishlistPage'
import AdminPanel from '../pages/adminPanel/AdminPanel'
import AdminUsers from '../pages/adminPanel/sections/users/AdminUsers'
import Order from '../pages/adminPanel/sections/orders/Order'
import WomenCollegtion from '../pages/categories/womenCollegtion/WomenCollegtion'
import BabyCollegtion from '../pages/categories/babyCollegtion/BabyCollegtion'

const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/wishlist' element={<WishlistPage />} />
                <Route path='/adminPanel' element={<AdminPanel />} />
                <Route path='/adminPanel/users' element={<AdminUsers />} />
                <Route path='/adminPanel/order' element={<Order />} />
                <Route path='/categories/man' element={<ManCollegtion />} />
                <Route path='/categories/woman' element={<WomenCollegtion />} />
                <Route path='/categories/baby' element={<BabyCollegtion />} />
                <Route path='/details' element={<DetailPage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/payment-success' element={<PaymentSuccesPage />} />
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