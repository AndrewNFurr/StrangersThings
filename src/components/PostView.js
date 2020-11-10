import React, { useState, useEffect } from 'react';
import { getUser, hitAPI } from '../api';

const MessageForm = ({
    handleClick,
    //content,
   // setContent
}) => {
    const [content, setContent] = useState('');
    return <form onSubmit={(event) => event.preventDefault()}>
                         <input
                            type="text"
                            value={content}
                            onChange={(event) => {
                                setContent(event.target.value)
                            }}
                            placeholder="Message to Author"
                                                    />
                          <button onClick={handleClick}>Post Message</button>
                         </form>
}

const PostView = ({
    postList,
    content
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
                                {post.title} ({post.location})
                                </h5>
                                <p>{post.description}</p>

                                {
                                    (post.isAuthor) ?
                                    <div className='user-options'>
                                    <button onClick={() => {
                                        hitAPI("DELETE", `/posts/${post._id}`);
                                    }}>Delete</button>

                                    <button onClick={() => {
                                        console.log(post.messages, post)
                                        setCommentView(!commentView);
                                    }}>{commentView ? 'Close Comments' : 'See Comments' }</button>

                                    <button>Edit</button>
                                    </div>
                                    : <div className='user-options'>
                                        <MessageForm 
                                                     //content={content}
                                                     //setContent={setContent}
                                                     handleClick={() => {
                                                       const payload = {
                                                           message: {
                                                               content: content
                                                           }
                                                       } 
                                                       console.log(content)
                                                       hitAPI("POST", `/posts/${post._id}/messages`, payload) 
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