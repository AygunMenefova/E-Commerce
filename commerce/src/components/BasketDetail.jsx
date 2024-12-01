import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer1, uptadeBalance } from '../redux/appSlice';
import Button from '@mui/material/Button';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify'

function BasketDetail() {


    const { drawer1, currentUser } = useSelector((state) => state.app)
    const { basket, totalAmount } = useSelector((state) => state.basket)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])


    const closeDrawer1 = () => {
        dispatch(setDrawer1(false))
    }

    const removeProduct = (productId) => {
        dispatch(removeProductFromBasket(productId))
    }

    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Your balance is not sufficient")
            return
        }
        if (currentUser?.balance) {
            const remaningTotal = currentUser.balance - totalAmount
            const payload = {
                ...currentUser,
                balance: remaningTotal
            }
            dispatch(uptadeBalance(payload))
            dispatch((setBasket([])))
            localStorage.removeItem("basket")
            toast.success("products have been purchased")
        }
    }
    return (
        <Drawer  className='drawer1' sx={{ position: 'absolute', zIndex: '9999' }} open={drawer1} anchor='right' onClose={closeDrawer1}>
            {
                basket && basket.map((product) => (
                    <>
                        <div className='all-basket'>
                            <div className='img-border'>
                                <img className='img' src={product.image} />
                            </div>
                            <div className='basket-text'>
                                <div className='basket-title'>{product.title.substring(0, 30)}</div>
                                <div className='basket-desc'>{product.description.substring(0, 40)}...</div>
                                <div className='basket-count'>{product.count}</div>
                                <div className='basket-price'>{product.price}$</div>
                                <div><Button onClick={() => removeProduct(product.id)} className='basket-btn' sx={{ color: 'gray', fontStyle: 'italic', fontSize: '11px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', padding: '5px 30px', marginRight: '20px', marginTop: '15px', borderRadius: '2px' }}>Substract</Button></div>
                            </div>
                        </div>
                    </>
                ))
            }
            <div className='all-baskett'>
                <div className='basket-pricce'>Total amount : {totalAmount}$</div>
                <div className='btn-div'>
                <div><Button onClick={buy} className='basket-btn' sx={{ color: 'gray', fontStyle: 'italic', fontSize: '11px', letterSpacing: '2px', backgroundColor: 'whitesmoke', borderRadius: '2px', boxShadow: '1px 1px 1px 1px #ddd', padding: '5px 30px', marginLeft: '60px', marginTop: '30px' }}>Buy</Button></div>
                </div>
            </div>
        </Drawer>
    )
}

export default BasketDetail