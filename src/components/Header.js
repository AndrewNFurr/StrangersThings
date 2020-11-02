import React from 'react';

const Header = ({
    setHasAccount
}) => {
    return <div id='header'>
        <h1>Craig's List Lite</h1>
        <div className='accounts'>
            <button onClick={() => {
                setHasAccount(false)
            }}>Create an Account</button>
            <button onClick={() => {
                setHasAccount(true)
            }}>Log In</button>
        </div>
    </div>
}

export default Header;