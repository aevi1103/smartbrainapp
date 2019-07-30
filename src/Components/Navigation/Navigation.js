import React from 'react'

const Navigation = ({onRouteChnage, isSignedIn}) => {

    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f4 link dim black pa3 pointer' onClick={() => onRouteChnage('signout')}>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f4 link dim black pa3 pointer' onClick={() => onRouteChnage('signout')}>Sign In</p>
                <p className='f4 link dim black pa3 pointer' onClick={() => onRouteChnage('register')}>Register</p>
            </nav>
        )
    }

}

export default Navigation;