import React from 'react'
import Video from '../videos/video.mp4'

function VideoPlayer() {
    return (
        <div className='video'>
            <video  className='video' autoPlay loop muted>
                <source src={Video} />
            </video>
        </div>
    )
}

export default VideoPlayer