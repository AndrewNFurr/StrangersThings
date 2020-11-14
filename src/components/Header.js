import React from 'react';

import {Auth} from "../components";

import {clearToken} from "../api";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  setPostList,
  postList}) => {
  return <div id='header'>
    {isLoggedIn ? (
      <>
      <h1>Welcome to Stranger's Things!</h1>
      <button
        onClick={() => {
        clearToken();
        setIsLoggedIn(false);
      }}>LOG OUT</button>
      </>
    ) : (
      <>
      <h1>Stranger's Things</h1>
      <Auth
        setIsLoggedIn={setIsLoggedIn}
        postList={postList}
        setPostList={setPostList} />
      </>
    )}
  </div>
}

export default Header;