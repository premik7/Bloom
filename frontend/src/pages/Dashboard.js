import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost } from '../utils/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false); // State to control textarea visibility

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.posts);
      } catch (err) {
        setError('Failed to fetch posts.');
      }
    };

    loadPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setPosts([]);
    setNewPostContent('');
    window.location.href = '/';
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      alert('Please enter some content for the post.');
      return;
    }

    setIsLoading(true);
    try {
      const newPost = await createPost({ content: newPostContent, tags: [] });
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('Failed to create post.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  return (
    <Container>
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        Dashboard
      </motion.h1>

      {error && <Error>{error}</Error>}

      <ButtonContainer>
        <NatureButton onClick={handleLogout}>Logout</NatureButton>
      </ButtonContainer>

      <CreatePostSection>
        <NatureButton onClick={handleToggleTextarea}>
          {showTextarea ? 'Hide Post' : 'Create Post'}
        </NatureButton>

        {showTextarea && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <TextareaWrapper>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                rows="4"
              />
              <NatureButton onClick={handleCreatePost} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Post'}
              </NatureButton>
            </TextareaWrapper>
          </motion.div>
        )}
      </CreatePostSection>

      <PostsList>
        {posts.map((post, index) => (
          <PostCard
            key={post._id}
            customScale={index + 1} // Custom scale factor based on number of posts
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {post.content}
            </motion.h3>
            <PostInfo>
              <p>By: {post.author ? post.author.username : 'Unknown'}</p>
            </PostInfo>
          </PostCard>
        ))}
      </PostsList>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(to bottom, #e3f2fd, #ffffff);
  color: #333;
  min-height: 100vh;
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  position: relative;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const NatureButton = styled.button`
  background-color: #81c784;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #66bb6a;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #c8e6c9;
    cursor: not-allowed;
  }
`;

const CreatePostSection = styled.div`
  margin: 20px auto;
  width: 60%;
`;

const TextareaWrapper = styled.div`
  position: relative;
  textarea {
    width: 100%;
    height: 120px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    border: 2px solid #81c784;
    background-color: #f1f8e9;
    resize: none;
    margin-bottom: 10px;
  }
`;

const PostsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
`;

const PostCard = styled(motion.li)`
  background-color: white;
  margin: 15px 0;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  transform: scale(${(props) => 1 + props.customScale * 0.05});

  &:hover {
    transform: scale(${(props) => 1.05 + props.customScale * 0.05});
  }

  h3 {
    font-size: 1.2rem;
    line-height: 1.5;
    margin: 0;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    background-image: url('https://www.transparenttextures.com/patterns/grass.png');
    background-size: cover;
    background-repeat: repeat-x;
  }

  &::after {
    content: '🍃';
    position: absolute;
    top: -20px;
    right: 10px;
    font-size: 2rem;
    transform: rotate(30deg);
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
`;

export default Dashboard;
