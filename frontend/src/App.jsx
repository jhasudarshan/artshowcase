import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import ArtworkDetails from './components/ArtWorkDetails';
import ArtworkImage from './components/ArtWorkImage';
import Comments from './components/Comments';
import CommentForm from './components/CommentForm';


const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, []);

  const addComment = (commentText) => {
    axios.post('http://localhost:5000/comments', { text: commentText })
      .then(response => setComments([...comments, response.data]))
      .catch(error => console.error(error));
  };

  const addReply = (commentId, replyText) => {
    axios.post(`http://localhost:5000/comments/${commentId}/reply`, { replyText })
      .then(response => {
        const updatedComments = comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, replies: [...comment.replies, response.data] };
          }
          return comment;
        });
        setComments(updatedComments);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="app">
      <h1>Artwork Showcase: Silence of Love</h1>

      <ArtworkImage src="/artwork-image.jpg" alt="Silence of Love" />
      <VideoPlayer videoSrc="artwork-video.mp4" />
      <ArtworkDetails />

      <Comments comments={comments} addReply={addReply} />
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default App;