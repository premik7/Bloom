const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createPost, 
  getPosts, 
  addResonance 
} = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.post('/:postId/resonance', auth, addResonance);

module.exports = router;