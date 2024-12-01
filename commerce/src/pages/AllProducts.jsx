import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice';
import productServices from '../services/ProductServices'
import { toast } from 'react-toastify'
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';

function AllProducts() {

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.app)

  const [limit, setLimit] = useState(8)


  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true))
      const response = await productServices.getAllProducts()
      if (response) {
        dispatch(setProducts(response))
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product:" + error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getAllProducts()

  }, [])

  const loadMore = () => {
    setLimit((preLimit) => preLimit + 8)
  }
  const Loading = products.length <= limit

  useEffect(() => {
    const result = localStorage.getItem("currentUser")
    if (result) {
      const currentUser = JSON.parse(result)
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  return (
    <div >
      <Navbar />
      <div>
        <h1 className='all-products'>All Products</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            products && products.slice(0, limit).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))

          }
        </div>
        <div className='load'>
          {!Loading && (<Button sx={{ color: 'gray', fontStyle: 'italic', fontSize: '13px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', padding: '8px 60px', marginLeft: '660px', marginTop: '210px', marginBottom: '40px', borderRadius: '2px' }} onClick={loadMore} className='all-button'>LOAD MORE </Button>)}
        </div>
      </div>
    </div >

  )
}

export default AllProducts