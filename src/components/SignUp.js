import React, { useState } from 'react';
import { registerUser, setList, getList } from '../api';


const SignUp = ({
    setUserList,
    setCurrentUser,
    currentUser,
    userList
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <form onSubmit={(event) => {
        event.preventDefault();
    }}>
        <h2>Sign Up for Stranger's Things!</h2>
        <hr/>
        
        <div id='email'>
            <input type='email'
                   placeholder='Email Address'
                   value={ username }
                   onChange={(e) => {
                    setUsername(e.target.value)
                   }}/>
        </div>
        <div id='password'>
            <input type='password'
                   placeholder='Create a password'
                   value={ password } 
                   onChange={(e) => {
                       setPassword(e.target.value)
                   }} />
        </div>
        <button onClick={() => {
            const newUser = {
                username: username,
                password: password
            }

            setCurrentUser(newUser);
            console.log( currentUser );

            let newUserList = [...userList, newUser];

            setUserList(newUserList);
            setList(newUserList);
            //registerUser(newUser.username, newUser.password);

            console.log(newUserList);
            console.log(newUser);
            
        }}>Create Account</button>
    </form>

}

export default SignUp;