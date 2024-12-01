import React from 'react'
import { Routes, Route } from 'react-router-dom'
import All from '../pages/All'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AllProducts from '../pages/AllProducts'
import WomenClothing from '../pages/WomenClothing'
import MenClothing from '../pages/MenClothing'
import Accessories from '../pages/Accessories'
import Electronics from '../pages/Electronics'
import ProductDetail from '../pages/ProductDetail'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<All />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/women' element={<WomenClothing />} />
            <Route path='/men' element={<MenClothing />} />
            <Route path='/accessories' element={<Accessories />} />
            <Route path='/electronics' element={<Electronics />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/product-detail/:productId' element={<ProductDetail />} />

        </Routes>

    )
}

export default RouterConfig