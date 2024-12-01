import { useEffect, useState } from 'react'
import './App.css'
import RouterConfig from './config/RouterConfig'
// import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner'
import SearchDetail from './components/SearchDetail'
import ProductServices from './services/ProductServices';
import { useDispatch } from 'react-redux'
import { setCurrentUser, setProducts } from './redux/appSlice';
import { setBasket } from './redux/basketSlice';
import BasketDetail from './components/BasketDetail';

function App() {

  const dispatch = useDispatch()
  const getAllProducts = async () => {
    const products = await ProductServices.getAllProducts()
    dispatch(setProducts(products))
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser")
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString)
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const basketString = localStorage.getItem("basket")
    if (basketString) {
      const basket = JSON.parse(basketString)
      dispatch(setBasket(basket))
    }
  }, [])

  return (
    <div>
      {/* <Navbar/> */}
      <RouterConfig />
      <ToastContainer autoClose={2000} style={{ fontSize: '13px' }} />
      <Spinner />
      <SearchDetail />
      <BasketDetail/>
    </div>
  )
}

export default App
