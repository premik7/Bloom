const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    const userId = req.user.userId;

    const post = new Post({
      author: userId,
      content,
      tags: tags.map(tag => tag.toLowerCase().trim())
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username avatar');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const query = tag ? { tags: tag } : {};

    const posts = await Post.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'username avatar')
      .populate('comments.author', 'username avatar');

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addResonance = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const user = await User.findById(userId);
    if (user.resonanceGiven.includes(postId)) {
      return res.status(400).json({ error: 'Already resonated with this post' });
    }

    post.resonance += 1;
    user.resonanceGiven.push(postId);

    await post.save();
    await user.save();

    res.json({ resonance: post.resonance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};