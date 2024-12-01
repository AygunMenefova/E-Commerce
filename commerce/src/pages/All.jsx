import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/manuka1.webp'
import image2 from '../images/manuka2.webp'
import CarouselItem from 'react-bootstrap/esm/CarouselItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import image from '../images/manuka.webp'
import image3 from '../images/manuka4.webp'


function All() {

  return (
    <div>
      <div style={{position:"absolute"}} >
        <Navbar />
        <div>
        <VideoPlayer />
        </div>
        <div>
          <img className='image' src={image} />
          <img className='image3' src={image3} />
        </div>
        <div className='carousell'>
          <Carousel className='carousel'>
            <CarouselItem interval={2000}>
              <img src={image1} />
            </CarouselItem>
            <CarouselItem interval={2000}>
              <img src={image2} />
            </CarouselItem>
          </Carousel>
        </div>
      </div>
    </div >
  )
}

export default All