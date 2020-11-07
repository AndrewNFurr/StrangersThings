import React, { useState } from 'react';
import { makeUserPost, getUser } from '../api';

const PostForm = () =>{
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [price, setPrice] = useState('');

    return <form onSubmit={(event) => event.preventDefault()}>
        <input
            type="text"
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
            placeholder="Title of Post"
            />
     <input
            type="text"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
            placeholder="Content and Description"
      />
       <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
      />
      <button onClick={()=> {
          makeUserPost(postTitle, postContent, price);
      }}>Create Post</button>
    </form>
}

export default PostForm;