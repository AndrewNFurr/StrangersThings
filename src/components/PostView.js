import React, { useState } from 'react';
import { hitAPI } from '../api';

const MessageForm = ({
    handleClick
}) => {
    const [content, setContent] = useState('')
    
    return <form onSubmit={(event) => event.preventDefault()}>
                         <input
                            type="text"
                            value={content}
                            onChange={(event) => {
                                setContent(event.target.value)
                            }}
                            placeholder="Message to Author"
                                                    />
                          <button onClick={() => {
                              handleClick(content)
                              setContent("");
                            }}>Post Message</button>
                         </form>
}
const MessageView = ({
    messageList
}) => {
    const [commentView, setCommentView] = useState(false);

    return <><button onClick={() => {
        setCommentView(!commentView);
    }}>Messages</button>

    {
    commentView  ?
    messageList.map((message, idx) => {
    return <div key={idx}>
            <p 
               style={{
                   border: "1px solid black"
               }}
               >{message.content}</p>
        </div>
    }) : null
    }
    </>  
    
}

const PostView = ({
    postList,
    setPostList,
    setEditablePost,
    isLoggedIn
}) => {
    return <div className='list'>
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
                                {post.title} ({post.location}) {post.price}
                                </h5>
                                <p>{post.description}</p>

                                {(isLoggedIn) ?
                                    ((post.isAuthor) ?
                                    <div className='user-options'>
                                    <button onClick={async () => {
                                        try {
                                            const data = await hitAPI("DELETE", `/posts/${post._id}`);
                                            setPostList(data.posts);
                                        } catch(error) {
                                            console.log(error)
                                        }
                                    }}>Delete</button>

                                    <button onClick={() => {
                                        setEditablePost(post)
                                    }}>Edit</button>
                                    <MessageView messageList={ post.messages } />
                                    </div>
                                    : <div className='user-options'>
                                        <MessageForm 
                                                     handleClick={async (content) => {
                                                        const payload = {
                                                            message: {
                                                                content: content
                                                            }
                                                        } 
                                                        try {
                                                            hitAPI("POST", `/posts/${post._id}/messages`, payload) 
                                                        } catch (error) {
                                                            console.error(error);
                                                        }
                                                       
                                                     }}/>
                                    </div>) : null
                                }
                            </div>
                            );
                        })}
    </div>
}

export default PostView