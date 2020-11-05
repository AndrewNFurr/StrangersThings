import React, { useState } from 'react';

import { fetchPosts } from '../api'



const LogIn = ({
    userList,
    currentUser,
    setUserList
}) => {
    const [username, setUsername] = useState('')
    return <form onSubmit={(event) => {
        event.preventDefault();
        // axios request, to /users/register send password and username...
    }}>
        <h3>Log in to Stranger's Things</h3>
        <hr/>
        <div id='email'>
            <input type='email'
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
                   placeholder='Email Address'/>
        </div>
        <div id='password'>
            <input type='password'
                   placeholder='password' />
        </div>
        <button onClick={async () => {
            const data = await fetchPosts();
        }}>Log In</button>
    </form>
}


export default LogIn;