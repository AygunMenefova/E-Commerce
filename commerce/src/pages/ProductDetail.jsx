import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setLoading } from '../redux/appSlice'
import ProductServices from '../services/ProductServices'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar';
import { TfiMinus } from "react-icons/tfi";
import { TfiPlus } from "react-icons/tfi";
import { addProductToBasket } from '../redux/basketSlice'

function ProductDetail() {

    const { productId } = useParams()

    const dispatch = useDispatch()

    const [product, setProduct] = useState()

    const [count, setCount] = useState(0)


    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const getProductById = async (productId) => {
        try {
            dispatch(setLoading(true))
            const product = await ProductServices.getProductById(productId)
            setProduct(product)
        } catch (error) {
            toast.error("An error occurred while fetching the product:" + error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    const addBasket = () => {
        if (product) {
            const payload = {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload))
            toast.success("Product added to cart")
        }

    }

    useEffect(() => {
        getProductById(productId)
    }, [])

    return (
        <div>
            <Navbar />
            <div>
                <div style={{ position: 'absolute', marginTop: '200px', marginLeft: '150px' }}>
                    <div>
                        <div className='detail1'>
                            {product && <>
                                <div className='product-detail-img'>
                                    <img className='detail-img' src={product.image} width={300} height={400} />
                                </div>
                                <div className='all-text'>
                                    <div className='title'>{product.title}</div>
                                    <div className='description'>{product.description}</div>
                                    <div className='pricee'>{product.price}$</div>
                                    <div className='quantity'>
                                        <h3 className='quantity-h3'>Quantity</h3>
                                        <span className='d-icon'>
                                            <span onClick={decrement}><TfiMinus onClick={decrement} className='tfi1' /></span>
                                            <span>{count}</span>
                                            <span onClick={increment}><TfiPlus onClick={increment} className='tfi2' /></span>
                                        </span>
                                    </div>

                                    <button onClick={addBasket} className='button'>ADD TO BAG </button>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail