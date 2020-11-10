import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
    NavLink
  } from 'react-router-dom';


import { 
    Auth,
    Header,
    Welcome,
    Footer,
    PostForm,
    PostView
 } from './components';

 import { getToken, hitAPI } from "./api";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [currentUser, setCurrentUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [postList, setPostList] = useState([]);

    function addNewPost(newPost) {
        setPostList([newPost, ...postList])
    }

  useEffect(() => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      })
      .catch(console.error);
  }, [isLoggedIn]);


        return (
            <div className="app">
            <Header />
            {isLoggedIn ? (
                <>
                <Welcome setIsLoggedIn={setIsLoggedIn}
                         currentUser={currentUser}
                         setCurrentUser={setCurrentUser}/>
                <PostForm addNewPost={ addNewPost } />
                <PostView userPosts={userPosts}
                          setUserPosts={setUserPosts}
                          postList={postList}
                          setPostList={setPostList}/>
                </>
            ) : (
                <Auth setIsLoggedIn={setIsLoggedIn}
                      postList={postList}
                      setPostList={setPostList} />
                     
            )}
                
            <Footer />
            </div>
        );
        };


ReactDOM.render(
    <Router>
    <App />
    </Router>,
    document.getElementById('app')
)