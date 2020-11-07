import React from 'react';
import { getToken, clearToken, getPosts } from "../api";

const Welcome = ({
    setCurrentUser,
    currentUser,
    setIsLoggedIn
}) => {
    return <div>
        <h1>Welcome to Stranger's Things!</h1>
        <button
                    onClick={() => {
                    clearToken();
                    setIsLoggedIn(false);
                    }}
                >
                    LOG OUT
                </button>
    </div>;
}

export default Welcome;