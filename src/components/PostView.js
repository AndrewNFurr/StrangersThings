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

const PostView = ({
    postList,
    setPostList
}) => {
    const [commentView, setCommentView] = useState(false);

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

                                {
                                    (post.isAuthor) ?
                                    <div className='user-options'>
                                    <button onClick={async () => {
                                        try {
                                            hitAPI("DELETE", `/posts/${post._id}`);
                                            setPostList(postList);
                                        } catch(error) {
                                            console.log(error)
                                        }
                                    }}>Delete</button>

                                    <button onClick={() => {
                                        console.log(post.messages, post)
                                        setCommentView(!commentView);
                                    }}>Messages</button>

                                    <button>Edit</button>
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
                                    </div>
                                }
                                <div>
                                    {
                                         commentView == true ?
                                         post.messages.map((message, idx) => {
                                         return <div key={idx}>
                                                 <p 
                                                    style={{
                                                        border: "1px solid black"
                                                    }}
                                                    >{message.content}</p>
                                             </div>
                                         }) : null        
                                    }
                                </div>
                            </div>
                            );
                        })}
    </div>
}

export default PostView