import React from 'react';

const Comments = ({ comments, addReply }) => {
  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          {comment.replies && comment.replies.map(reply => (
            <div key={reply.id} className="reply">
              <p>{reply.replyText}</p>
            </div>
          ))}
          {console.log(comment)}
          <button onClick={() => addReply(comment.id, prompt('Enter your reply'))}>
            Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default Comments;