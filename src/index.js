import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

import { 
    Header,
    PostForm,
    PostView,
 } from './components';

 import { getToken, hitAPI } from "./api";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [postList, setPostList] = useState([]);
    const [searchResults, setSearchResults] = useState('');    
    const [searchTerm, setSearchTerm] = useState('');
    const [editablePost, setEditablePost] = useState({})
    const [userPostsOnly, setUserPostsOnly] = useState(false);

    function addNewPost(newPost) {
        setPostList([...postList, newPost])
    }

    function updatePost(updatedPost) {
        let index = postList.findIndex((post) => {
            return post._id === updatedPost._id
        })
        if (index > -1) {
      let postListCopy = [...postList];
      postListCopy[index] = updatedPost;
      setPostList(postListCopy);
      }
    }
    // this function filters global postList by user entered keywords
    // also takes into consideration whether user wants to see only their own posts or all posts
    // Though it feels a little verbose, it works for me. If you have a better method, by all means feel free to do as you please.
    function filteredPosts() {
      if (userPostsOnly) {
        return postList.filter((post) => {
          return post.isAuthor && post.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
      } else {
        return postList.filter((post) => {
          return post.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
      };
    }
    const GetUserMessages = () => {
        return postList.map(post => {
            return post.isAuthor ? <div
                       className="post"
                       key={post._id}
                       style={{
                          border: "5px solid olive",
                                }}
                    >
                       <h5>For: {post.title}</h5>
                       { 
                           post.messages.map((message, idx) => {
                            return <div style={{
                               border: "2px solid tan",
                               margin: "2px"
                           }}  >
                                <p key={idx}>From: {message.fromUser.username}</p>
                                  <p>{message.content}</p> 
                                  </div>
                           })
                       } 
            </div> : null
        })
    }

  useEffect(async () => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      })
      .catch(console.error);
  }, [isLoggedIn, postList]);


  return (
    <>
    <Header
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      setPostList={setPostList}
      postList={filteredPosts()}
      setUserPostsOnly={setUserPostsOnly} />
    <div id="search" >
      <label htmlFor="keywords">Search For a Post</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="Enter Post Title" 
        value={ searchTerm } 
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />
      {isLoggedIn ? ( // if logged in, a button displays allowing user to toggle between user posts and all posts
        userPostsOnly ? (
        <button onClick={() => {
          setUserPostsOnly(!userPostsOnly)}}>Show all posts</button>
        ) : (
        <button onClick={() => {
          setUserPostsOnly(!userPostsOnly)}}>Show only user posts</button>)) : null}
    </div> 
    <div className="logged-in-view">
    <PostView setSearchResults={setSearchResults}
                    postList={filteredPosts()}
                    setEditablePost={setEditablePost}
                    setPostList={setPostList}
                    isLoggedIn={isLoggedIn}
                    userPostsOnly={userPostsOnly}
                                />
        <div>{
            userPostsOnly ? <> 
                <h1>User Messages</h1>
                <GetUserMessages />
                </>
            : null
        }</div>
        {isLoggedIn ?
        <PostForm addNewPost={ addNewPost }
                  {...editablePost}
                  setEditablePost={setEditablePost}
                  updatePost={updatePost} /> : null
      }
        
    </div>
    </>
  );
};


ReactDOM.render(
    <App />,
    document.getElementById('app')
)