import React from 'react';

const LogIn = () => {
    return <form className='log'>
        <div id='email'>
            <input type='email'
                   placeholder='Email Address'/>
        </div>
        <div id='password'>
            <input type='password'
                   placeholder='password' />
        </div>
        <button onSubmit={(event) => {
            event.preventDefault();
            setHasAccount(null);
        }}>Log In</button>
    </form>
}

const SignUp = () => {
    return <form className='log'>
        <div id='username'>
            <input type='text'
                   placeholder='Choose a username' />
        </div>
        <div id='email'>
            <input type='email'
                   placeholder='Email Address'/>
        </div>
        <div id='password'>
            <input type='password'
                   placeholder='Create a password' />
        </div>
        <button onSubmit={(event) => {
            event.preventDefault();
            setHasAccount(null);
        }}>Create Account</button>
    </form>

}

const LogInForm = ({
    hasAccount,
    setHasAccount
}) => {
    return hasAccount === true
           ? LogIn()
           : hasAccount === false ? SignUp()
           : null;
}

export default LogInForm;