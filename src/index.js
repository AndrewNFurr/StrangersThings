import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

import { 
    Auth,
    Header,
    Welcome,
    Footer,
    PostForm,
    PostView,
 } from './components';

 import { getToken, hitAPI } from "./api";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [postList, setPostList] = useState([]);
    const [searchResults, setSearchResults] = useState('');    
    const [isRecent, setIsRecent] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    function addNewPost(newPost) {
        setPostList([...postList, newPost])
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
            <div className="app">
            <Header />
            <div id="search" >
                      <label htmlFor="keywords">Search For a Post</label>
                      <input 
                        id="keywords" 
                        type="text" 
                        placeholder="Enter Post Title" 
                        value={ searchTerm } 
                        onChange={
                                  (event) => {
                                    setSearchTerm(event.target.value);
                                  }}/>
                   </div> 
            {isLoggedIn ? (
                <>
                <Welcome setIsLoggedIn={setIsLoggedIn}/>
                <div className="logged-in-view">
                        <PostForm addNewPost={ addNewPost }
                                    />
                            <PostView setSearchResults={setSearchResults}
                                    postList={filteredPosts()}
                                    setPostList={setPostList}
                                    searchResults={searchResults}/>
                </div>
                </>
            ) : (
                <Auth setIsLoggedIn={setIsLoggedIn}
                      postList={filteredPosts()}
                      setPostList={setPostList} />   
            )}
            <Footer />
            </div>
        );
        };


ReactDOM.render(
    <App />,
    document.getElementById('app')
)