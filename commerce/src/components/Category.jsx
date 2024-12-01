import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import categoryService from '../services/CategoryService'
import { setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'

function Category() {

    const dispatch = useDispatch()
    const[categories,setCategories]=useState()

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories = await categoryService.getAllCategories()
            setCategories(categories)
        } catch (error) {
            toast.error("An error occurred while retrieving the category list:" + error)
           
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <div>
            {
                categories && categories.map((category)=>{
                
                })
            }
        </div>
    )
}

export default Category