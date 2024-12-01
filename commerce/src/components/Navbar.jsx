import React, { useState } from 'react'
import '../css/Navbar.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { PiHandbagLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom"
import { setDrawer, setDrawer1 } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@mui/material/Badge';
import { CiMenuBurger } from "react-icons/ci";

// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { basket } = useSelector((state) => state.basket)

    const openDrawer = () => {
        dispatch(setDrawer(true))
    }
    const openDrawer1 = () => {
        dispatch(setDrawer1(true))
    }

    const [isOpen, setIsOpen] = useState(true)

    const DisplayMenu = () => {
        setIsOpen(!isOpen)
    }

    return (

        <div >
            <div className='header-all' >

                <div>
                    <img onClick={() => navigate("/")} className='logo' src={logo} />
                </div>

                <div className={isOpen ? "display" : ""}>
                    <div className='all-link'>
                        <Link className='link' to='/allproducts'>All Products</Link>
                        <Link className='link' to='/women'>Women</Link>
                        <Link className='link' to='/men'>Men</Link>
                        <Link className='link' to='/accessories'>Accessories</Link>
                        <Link className='link' to='/electronics'>Electronics</Link>
                    </div>
                </div>
                <div onClick={DisplayMenu} className='menu'>
                    <CiMenuBurger />
                </div>

                <div className='icons'>
                    <PiMagnifyingGlassThin onClick={openDrawer} className='icon' />
                    <RxPerson onClick={() => navigate("/login")} className='icon' />
                    <Badge sx={{ cursor: 'pointer' }} onClick={openDrawer1} badgeContent={basket.length} color='default' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
                        <PiHandbagLight className='icon' />
                    </Badge>
                </div>
            </div>
        </div>

    )
}

export default Navbar