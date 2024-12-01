import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import jeweleryService from '../services/JeweleryService'
import { useDispatch, useSelector } from 'react-redux'
import { setJewelery, setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import JeweleryCard from '../components/JeweleryCard'
import Button from '@mui/material/Button';


function Accessories() {

  const dispatch = useDispatch()
  const { jewelery } = useSelector((state) => state.app)

  const [limit, setLimit] = useState(2)

  const getAllJewelery = async () => {
    try {
      dispatch(setLoading(true))
      const response = await jeweleryService.getAllJewelery()
      if (response) {
        dispatch(setJewelery(response))
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product:" + error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getAllJewelery()
  }, [])

  const loadMore = () => {
    setLimit((preLimit) => preLimit + 2)
  }

  const Loading = jewelery.length <= limit

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='all-products'> Accessories</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            jewelery && jewelery.slice(0, limit).map((product, index) => (
              <JeweleryCard key={index} product={product} />
            ))
          }
        </div>
        <div className='load'>
          {!Loading && (<Button sx={{ color: 'gray', fontStyle: 'italic', fontSize: '13px', letterSpacing: '2px', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 1px 1px #ddd', padding: '8px 60px', marginLeft: '660px', marginTop: '210px', marginBottom: '40px', borderRadius: '2px' }} onClick={loadMore} className='all-button'>LOAD MORE </Button>)}
        </div>
      </div>
    </div>
  )
}

export default Accessories