import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { Log_in } from './Api';

// יצירת ערכת עיצוב מותאמת אישית
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
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
        <Button color="inherit" onClick={() => navigate('/LoginForm')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/SigninForm')}>Sign Up</Button>
       
      </Toolbar>
    </AppBar>
  );
};

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { id: "null", username: username, password: password, email: "email" };

    try {
      const response = await Log_in(user);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/Course');
      } else {
        setShowError(true);
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        navigate('/SigninForm');
      } else if (err?.response?.status === 400) {
        alert('Incorrect password');
      }
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
            Login Form
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
            <TextField
              required
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
              fullWidth
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handleChangePassword}
              fullWidth
            />
            {showError && (
              <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                Incorrect password. Please try again.
              </Typography>
            )}
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
