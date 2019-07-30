import React from 'react'
import './FaceRecognition.css'

import FaceLocation from '../FaceLocation/FaceLocation'

const FaceRecognition = ({imageUrl, faces}) => {

    return (
        <div className="center ma">
            <div className='absolute mt2'>

                <img id='inputImage' className='shadow-5' src={imageUrl} alt='' width='700px' height='auto' />
                {faces.map((face, i) => {
                    return <FaceLocation 
                                key={i}
                                face={face}/>
                })}
            </div>
        </div>
    )

}

export default FaceRecognition;