import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    drawer: false,
    drawer1: false,
    products: [],
    jewelery: [],
    women: [],
    men: [],
    electronics: []

}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setDrawer1: (state, action) => {
            state.drawer1 = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        uptadeBalance: (state, action) => {
            const user = {
                ...action.payload
            }
            state.currentUser = user
            localStorage.setItem("currenyUser", JSON.stringify(state.currentUser))
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setJewelery: (state, action) => {
            state.jewelery = action.payload
        },
        setWomen: (state, action) => {
            state.women = action.payload
        },
        setMen: (state, action) => {
            state.men = action.payload
        },
        setElectronics: (state, action) => {
            state.electronics = action.payload
        },
        filterProducts: (state, action) => {
            const tempList = []
            state.products.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.products = [...tempList]
        },
        filterJewelery: (state, action) => {
            const tempList = []
            state.jewelery.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.jewelery = [...tempList]
        },
        filterElectronics: (state, action) => {
            const tempList = []
            state.electronics.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.electronics = [...tempList]
        },
        filterWomen: (state, action) => {
            const tempList = []
            state.women.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.women = [...tempList]
        },
        filterMen: (state, action) => {
            const tempList = []
            state.men.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.men = [...tempList]
        }
    }
})

export const { setLoading, setDrawer, setDrawer1, setCurrentUser, setProducts, setJewelery, setWomen, setMen, setElectronics, filterProducts, filterJewelery, filterElectronics, filterWomen, filterMen, uptadeBalance } = appSlice.actions

export default appSlice.reducer