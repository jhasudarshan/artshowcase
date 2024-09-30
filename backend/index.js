const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});


app.post('/comments', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Comment text are required' });
  }

  const newComment = {
    id: comments.length + 1,
    text,
    replies: [],
  };
  
  comments.push(newComment);
  res.status(201).json(newComment);
});


app.post('/comments/:id/reply', (req, res) => {
  const { id } = req.params;
  const {replyText} = req.body;
  
  const comment = comments.find(c => c.id === parseInt(id));
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  if (!replyText) {
    return res.status(400).json({ error: 'Reply text are required' });
  }

  const reply = {
    id: comment.replies.length + 1,
    replyText,
  };
  
  comment.replies.push(reply);
  res.status(201).json(reply);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});