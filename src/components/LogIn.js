import React from 'react';



const LogIn = ({
    userList,
    currentUser,
    setUserList
}) => {
    return <form>
        <h3>Log in to Stranger's Things</h3>
        <hr/>
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
            
        }}>Log In</button>
    </form>
}


export default LogIn;