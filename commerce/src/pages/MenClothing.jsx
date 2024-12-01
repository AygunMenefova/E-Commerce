import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import MenService from '../services/MenService'
import { useDispatch, useSelector } from 'react-redux'
import { setMen, setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import MenCard from '../components/MenCard'
import Button from '@mui/material/Button';


function  MenClothing() {

  const dispatch = useDispatch()
  const { men} = useSelector((state) => state.app)

  const [limit, setLimit] = useState(2)

  const getAllMen = async () => {
    try {
      dispatch(setLoading(true))
      const response = await MenService.getAllMen()
      if (response) {
        dispatch(setMen(response))
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product:" + error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getAllMen()
  }, [])

   const loadMore = () => {
    setLimit((preLimit) => preLimit + 2)
  }
  const Loading = men.length <= limit

  return (
    <div>
      <Navbar />
      <div>
      <h1 className='all-products'>Men's Clothing</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            men && men.slice(0,limit).map((product, index) => (
              <MenCard key={index} product={product} />
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

export default MenClothing