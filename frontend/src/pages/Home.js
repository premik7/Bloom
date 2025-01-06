import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../utils/api'; // Import loginUser and registerUser functions

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle Login
      try {
        const data = await loginUser({ email, password });
        localStorage.setItem('token', data.token); // Save token for authentication
        navigate('/dashboard'); // Redirect to dashboard on success
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Invalid credentials.';
        setError(errorMsg);
      }
    } else {
      // Handle Registration
      try {
        await registerUser({ username, email, password });
        setIsLogin(true); // Switch to login form after successful registration
        setEmail('');
        setPassword('');
        setUsername('');
        setError('');
        alert('Registration successful, please login!');
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Something went wrong. Please try again.';
        setError(errorMsg);
      }
    }
  };

  return (
    <Container>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          Welcome to Bloom 🌱
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A place for growth, creativity, and connection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button onClick={() => setShowForm(!showForm)} whileHover={{ scale: 1.1 }}>
            {showForm ? 'Close' : 'Get Started'}
          </Button>
        </motion.div>
      </Header>

      {showForm && (
        <FormContainer>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleFormSubmit}
          >
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!isLogin && (
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>

            <SwitchFormLink onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </SwitchFormLink>
          </motion.form>
        </FormContainer>
      )}

      <MediaSection>
        <motion.img
          src="https://via.placeholder.com/600x400" // Example image URL
          alt="Bloom social media"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          src="https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
          style={{ maxWidth: '100%', marginTop: '20px' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </MediaSection>

      <Footer>
        <p>Powered by Bloom. Let's grow together.</p>
      </Footer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  text-align: center;
  padding: 50px;
  background: linear-gradient(to bottom, #e3f2fd, #ffffff);
  color: #333;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 50px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    color: #666;
  }
`;

const Button = styled(motion.button)`
  background: #6200ea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`;

const FormContainer = styled.div`
  margin-top: 50px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SwitchFormLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #6200ea;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MediaSection = styled.div`
  margin-top: 50px;
  text-align: center;

  img {
    max-width: 80%;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  video {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Footer = styled.footer`
  margin-top: 50px;
  color: #666;
`;

export default Home;
