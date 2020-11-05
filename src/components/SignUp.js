import React from 'react';

const SignUp = () => {
    return <form>
        <h2>Sign Up for Stranger's Things!</h2>
        <hr/>
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
        }}>Create Account</button>
    </form>

}

export default SignUp;