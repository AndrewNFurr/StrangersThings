import React, { useState, useEffect } from 'react';
import { getUser, hitAPI, createMessage } from '../api';

const MessageForm = ({
    postList,
    setPostList
}) => {
    


    
}

const PostView = ({
    userPosts,
    setUserPosts,
    postList,
    setPostList
}) => {
    const [commentView, setCommentView] = useState(false);
    const [formView, setFormView] = useState(false);
    const [content, setContent] = useState('')

    useEffect(async () => {
        getUser()
              .then(response => {
                  const { posts } = response;
                  
                  setUserPosts(posts);
              }).catch(error => {error}), [postList]});

    return <div>
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

                                {
                                    (post.isAuthor) ?
                                    <div className='user-options'>
                                    <button onClick={() => {
                                        hitAPI("DELETE", `/posts/${post._id}`);
                                        setPostList(posts);
                                    }}>Delete</button>

                                    <button onClick={() => {
                                        console.log(post.messages, post)
                                        setCommentView(!commentView);
                                    }}>{commentView ? 'Close Comments' : 'See Comments' }</button>

                                    <button>Edit</button>
                                    </div>
                                    : <div className='user-options'>
                                        <button  onClick={() => {
                                                setFormView(!formView)
                                                const id = post._id;
                                                
                                                const thispost = postList.find(post => post._id == id)
                                                
                                        }}>Create Message</button>
                                    </div>
                                }
                                <div>
                                    {
                                         commentView == true ?
                                         post.messages.map((message, idx) => {
                                         return <div>
                                                 <p key={idx}
                                                    style={{
                                                        border: "1px solid black"
                                                    }}
                                                    >{message.content}</p>
                                             </div>
                                         }) : formView == true ? 
                                         <form onSubmit={(event) => event.preventDefault()}>
                                                <input
                                                    type="text"
                                                    value={content}
                                                    onChange={(event) => setContent(event.target.value)}
                                                    placeholder="Message to Author"
                                                    />
                                            <button onClick={() => {
                                                 console.log(post._id, post);
                                                 const newMessage = createMessage(content, post._id);
                                                 console.log(newMessage);
                                            }}>Post Message</button>
                                         </form>
                                           : null        
                                    }
                                </div>
                            </div>
                            );
                        })}
    </div>
}

export default PostView