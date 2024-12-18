import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default function PersonalArea() {
  const nameRef = useRef();
  const [userid, setUserid] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateUser, setUpdateUser] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  async function check(event) {
    event.preventDefault();
    const name = nameRef.current.value;

    try {
        const response = await axios.get(`/users/getUserByName/${name}`);
        setUserid(response.data.id);
        console.log('User ID:', response.data.id);
    } catch (error) {
        console.error('Error fetching ID:', error);
        alert('Error fetching ID: ' + error.message);
    }
}

async function returnResponseDelete() {
  try {
    await axios.delete(`/users/deletUser/${userid}`);
    alert('חשבונך הוסר בהצלחה!');
    navigate('/');
  } catch (error) {
    console.error('Error deleting account:', error);
    alert('Error deleting account: ' + error.response?.data?.message || error.message);
  }
}

  async function returnResponseUpdate(event) {
    event.preventDefault();

    try {
      const response = await axios.put(`/users/updateUsers/${userid}`, updateUser);
      alert('המשתמש עודכן בהצלחה!');
      setShowUpdateForm(false);
      setUpdateUser({ username: '', password: '', email: '' });
      navigate('/PersonalArea');
    } catch (error) {
      alert('Error updating user: ' + error.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  }

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
          {!showUpdateForm && (
            <Box component="form" onSubmit={check} noValidate sx={{ mt: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Personal Area
              </Typography>
              <TextField
                required
                fullWidth
                id="username"
                label="שם משתמש"
                name="username"
                autoComplete="username"
                autoFocus
                inputRef={nameRef}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                ENTER NAME
              </Button>
              {userid && (
                <>
                  <Button variant="contained" color="secondary" onClick={returnResponseDelete} fullWidth sx={{ mt: 2 }}>
                    DELETE ACCOUNT
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => setShowUpdateForm(true)} fullWidth sx={{ mt: 2 }}>
                    UPDATE ACCOUNT
                  </Button>
                </>
              )}
            </Box>
          )}
          {showUpdateForm && (
            <Box component="form" onSubmit={returnResponseUpdate} noValidate sx={{ mt: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Update Account
              </Typography>
              <TextField
                required
                fullWidth
                id="username"
                label="שם משתמש"
                name="username"
                value={updateUser.username}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                value={updateUser.password}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                name="email"
                label="אימייל"
                type="email"
                value={updateUser.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                עדכון
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
