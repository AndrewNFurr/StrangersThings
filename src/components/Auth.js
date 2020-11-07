
import React, { useState, useEffect } from "react";

import { getPosts, auth } from "../api";

const Auth = ({
    setIsLoggedIn,
    postList,
    setPostList
}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(async () => {
      getPosts()
            .then(response => {
                const posts = response.data.posts
                
                setPostList(posts);
            }).catch(error => {error}), [postList]});


  return ( <>
    <form onSubmit={(event) => event.preventDefault()}>
      <h3>Register or Log In</h3>
      {errorMessage ? <h5 className="error">{errorMessage}</h5> : null}
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <button
        onClick={async (event) => {
          try {
            const result = await auth(username, password, true);
            setIsLoggedIn(true);
          } catch (error) {
            setErrorMessage(error.message);
          }
        }}
      >
        Register
      </button>
      <button
        onClick={async (event) => {
          try {
            const result = await auth(username, password);
            setIsLoggedIn(true);
          } catch (error) {
            setErrorMessage(error.message);
          }
        }}
      >
        Log In
      </button>
    </form>
    <div>
        {postList.map((post) => {
                            return (
                            <div
                                className="post"
                                key={post._id}
                                style={{
                                border: post.isAuthor ? "5px solid gold" : "1px solid brown",
                                }}
                            >
                                <h5>
                                {post.title} ({post.location})
                                </h5>
                                <p>{post.description}</p>
                            </div>
                            );
                        })}
    </div> </>
  );
};

export default Auth;