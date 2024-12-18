import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, AppBar, Toolbar, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { addUser } from './Api';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: { h4: { fontWeight: 600 } },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        html: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          minHeight: '100vh',
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }
      },
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Learning
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/LoginForm')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/SigninForm')}>Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = { username, email, password };
    try {
      const response = await addUser(user);
      console.log('User added:', response.data);
      navigate('/LoginForm'); // Navigate to Login page
    } catch (err) {
      if (err?.response?.status === 400) {
        alert("You are an existing user! Please log in.");
        navigate('/LoginForm'); // Navigate to Login page
      } 
      console.error('Error adding user:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: 0,
          width: '100vw',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            maxWidth: 400,
            width: '100%',
            boxSizing: 'border-box',
            margin: '0 16px',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField required
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
              fullWidth
            />
            <TextField required
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleChangeEmail}
              fullWidth
              type="email"
            />
            <TextField required
              label="Password"
              variant="outlined"
              value={password}
              onChange={handleChangePassword}
              fullWidth
              type="password"
            />
            <TextField required
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              fullWidth
              type="password"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
