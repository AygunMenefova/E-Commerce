import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import ElectronicsService from '../services/ElectronicsService'
import { useDispatch, useSelector } from 'react-redux'
import { setElectronics, setLoading } from '../redux/appSlice'
import { toast } from 'react-toastify'
import ElectronicsCard from '../components/ElectronicsCard'
import Button from '@mui/material/Button';


function Electronics() {

  const dispatch = useDispatch()
  const { electronics } = useSelector((state) => state.app)

  const [limit, setLimit] = useState(4)

  const getAllElectronics = async () => {
    try {
      dispatch(setLoading(true))
      const response = await ElectronicsService.getAllElectronics()
      if (response) {
        dispatch(setElectronics(response))
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product:" + error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getAllElectronics()
  }, [])


  const loadMore = () => {
    setLimit((preLimit) => preLimit + 4)
  }
  const Loading = electronics.length <= limit


  return (
    <div>
      <Navbar />
      <div>
        <h1 className='all-products'>  Electronics</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            electronics && electronics.slice(0, limit).map(( product, index) => (
              <ElectronicsCard key={index} product={product} />
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

export default Electronics