import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
    basket: []
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = [...action.payload]
        },
        addProductToBasket: (state, action) => {
            if (state.basket.length == 0) {
                state.basket = [action.payload]
            } else {
                const findProduct = state.basket.find((product) => product.id === action.payload.id)
                if (findProduct && action.payload) {
                    findProduct.count = findProduct.count + action.payload.count

                    state.basket = [...state.basket.map((product) => product.id === findProduct.id ? findProduct : product)]
                } else {
                    state.basket = [...state.basket, action.payload]
                }
            }
            localStorage.setItem("basket", JSON.stringify(state.basket))
        },
        calculateBasket: (state) => {
            let totalAmount = 0
            state.basket && state.basket.map((product) => {
                if (product.count) {
                    totalAmount += product.price * product.count
                }
            })
            state.totalAmount = totalAmount
        },
        removeProductFromBasket: (state, action) => {
            state.basket = [...state.basket.filter((product) => product.id !== action.payload)]
            localStorage.setItem("basket", JSON.stringify(state.basket))
        }
    }
})

export const { setBasket, addProductToBasket, calculateBasket, removeProductFromBasket } = basketSlice.actions

export default basketSlice.reducer