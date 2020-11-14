import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

import { 
    Header,
    Footer,
    PostForm,
    PostView
 } from './components';

 import { getToken, hitAPI } from "./api";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [postList, setPostList] = useState([]);
    const [searchResults, setSearchResults] = useState('');    
    const [searchTerm, setSearchTerm] = useState('');
    const [editablePost, setEditablePost] = useState({})

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

    function filteredPosts() {
        return postList.filter((post) => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase());
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
      postList={filteredPosts()} />
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
    </div> 
    <div className="logged-in-view">
      <PostForm addNewPost={ addNewPost }
                {...editablePost}
                setEditablePost={setEditablePost}
                updatePost={updatePost} />
      <PostView setSearchResults={setSearchResults}
                                postList={filteredPosts()}
                                setEditablePost={setEditablePost}
                                setPostList={setPostList}
                                isLoggedIn={isLoggedIn}
                                />
    </div>
    <Footer />
    </>
  );
};


ReactDOM.render(
    <App />,
    document.getElementById('app')
)