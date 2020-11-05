import React from 'react';

const Welcome = ({
    setCurrentUser,
    currentUser
}) => {
    return <div>
        <h1>Welcome to Stranger's Things, { currentUser.username }!</h1>
        <button onClick={() => {
            setCurrentUser(null);
        }}>Log Out</button>
    </div>;
}

export default Welcome;