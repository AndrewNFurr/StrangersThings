import React, { useState } from 'react';
import { makeUserPost, getUser } from '../api';

const PostForm = ({
    addNewPost
}) =>{
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('')

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
      <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Price"
      />
      <button onClick={async () => {
         const resp = makeUserPost(postTitle, postContent, price);
      }}>Create Post</button>
    </form>
}

export default PostForm;