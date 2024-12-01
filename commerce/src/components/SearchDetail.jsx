import React from 'react'
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { filterElectronics, filterJewelery, filterMen, filterProducts, filterWomen, setDrawer, setElectronics, setJewelery, setMen, setProducts, setWomen } from '../redux/appSlice';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { toast } from 'react-toastify'
import ProductServices from '../services/ProductServices';
import JeweleryService from '../services/JeweleryService';
import ElectronicsService from '../services/ElectronicsService';
import WomenService from '../services/WomenService';
import MenService from '../services/MenService';

function SearchDetail() {

    const dispatch = useDispatch()

    const closeDrawer = () => {
        dispatch(setDrawer(false))
    }

    const handleFilter = async (e) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value))
                dispatch(filterJewelery(e.target.value))
                dispatch(filterElectronics(e.target.value))
                dispatch(filterWomen(e.target.value))
                dispatch(filterMen(e.target.value))
            } else {
                const products = await ProductServices.getAllProducts()
                const jewelery = await JeweleryService.getAllJewelery()
                const electronics = await ElectronicsService.getAllElectronics()
                const women = await WomenService.getAllWomen()
                const men = await MenService.getAllMen()
                dispatch(setProducts(products))
                dispatch(setJewelery(jewelery))
                dispatch(setElectronics(electronics))
                dispatch(setWomen(women))
                dispatch(setMen(men))
            }
        } catch (error) {
            toast.error("An error occurred while filtering:" + error)
        }
    }

    const { drawer } = useSelector((state) => state.app)
    return (
        <Drawer sx={{ position: 'absolute', zIndex: '9999' }} open={drawer} anchor='right' onClose={closeDrawer} >
            <TextField className='search' sx={{ marginTop: '50px' }}
                onChange={(e) => handleFilter(e)}
                id="searchInput"
                placeholder='What are you looking for ?'
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <PiMagnifyingGlassThin className='icon' />
                            </InputAdornment>

                        ),
                        style: {
                            color: 'gray',
                            letterSpacing: '1px'
                        }
                    }
                }}
                variant='standard'
            />
        </Drawer>
    )
}

export default SearchDetail