import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import womenService from '../services/WomenService'
import { useDispatch, useSelector } from 'react-redux'
import { setWomen, setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import WomenCard from '../components/WomenCard'
import Button from '@mui/material/Button';


function  WomenClothing() {

  const dispatch = useDispatch()
  const { women} = useSelector((state) => state.app)

  const [limit, setLimit] = useState(4)

  const getAllWomen = async () => {
    try {
      dispatch(setLoading(true))
      const response = await womenService.getAllWomen()
      if (response) {
        dispatch(setWomen(response))
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product:" + error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getAllWomen()
  }, [])

  const loadMore = () => {
    setLimit((preLimit) => preLimit + 4)
  }
  const Loading = women.length <= limit

  return (
    <div>
      <Navbar />
      <div>
      <h1 className='all-products'>Women's Clothing</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            women && women.slice(0,limit).map((product, index) => (
              <WomenCard key={index} product={product} />
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

export default WomenClothing