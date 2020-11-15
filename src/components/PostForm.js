import React, { useState, useEffect } from "react";

import { hitAPI } from "../api";

const PostForm = (props) => {
    
  const { addNewPost, _id, setEditablePost, updatePost } = props;
    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const [isDirty, setIsDirty] = useState(false);

  function clearForm() {
    setTitle('')
    setDescription('')
    setPrice('')
    setLocation('')
  }

  useEffect(() => {
    setTitle(props.title || '')
    setDescription(props.description || '')
    setPrice(props.price || '')
    setLocation(props.location || '')
  }, [_id])

  return (
    <form
      className="post-form"
      onSubmit={async (event) => {
        event.preventDefault();

        if (title.length === 0) {
          setIsDirty(true);
          return;
        }

        const postData = {
          post: {
            title,
            description,
            price,
            willDeliver,
          },
        };

        if (location.length > 0) {
          postData.post.location = location;
        }

        if (_id) {
            try {
            const result = await hitAPI("PATCH", `/posts/${_id}`, postData);
            updatePost(result.post);
            setEditablePost({}); 
            } catch (error) {
                console.error(error);
          }
          } else {
              try {
                    const newPost = await hitAPI("POST", `/posts`, postData);
                    addNewPost(newPost.post);
              } catch (error) {
                    console.error(error);
              }
          }
          
          clearForm();
      }}
    >
      <h3>Create New Post</h3>
      <input
        type="text"
        placeholder="title for your post"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {isDirty && title.length === 0 ? (
        <h3 style={{ color: "red" }}>You need a title</h3>
      ) : null}
      <textarea
        type="text"
        placeholder="description"
        rows="10"
        columns="80"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <input
        type="text"
        placeholder="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={willDeliver}
          onChange={() => setWillDeliver(!willDeliver)}
        />
        I will deliver this
      </label>
      <button>POST</button>
    </form>
  );
};

export default PostForm;