import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa2 br3 shadow-5'>
          <input className='pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100 center' type='text' onChange={onInputChange} placeholder="Enter URL"/>
          <button
            className='w-30 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;