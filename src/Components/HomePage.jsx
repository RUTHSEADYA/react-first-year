import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardMedia, CardContent, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      paper: '#ffffff',
      default: '#f5f5f5',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // שינוי ל-null כדי לנהל מצב טעינה

  useEffect(() => {
    // טיפול במצב טעינה
    const checkUserStatus = () => {
      const user = localStorage.getItem('user');
      console.log('User status:', user); // לוג למצב המשתמש
      setIsLoggedIn(!!user);
    };

    checkUserStatus();
  }, []);

  // טיפול במצב טעינה
  if (isLoggedIn === null) {
    return <div>Loading...</div>; // ניתן להחליף לטעינת מסך או עגלת טעינה
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Learning Hub
          </Typography>
          <Button color="inherit" onClick={() => navigate('/HomePage')}>Home Page</Button>
          {!isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate('/LoginForm')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/SigninForm')}>Sign Up</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/PersonalArea')}>Personal Area</Button>
              <Button color="inherit" onClick={() => navigate('/Course')}>Courses</Button>
              <Button color="inherit" onClick={() => navigate('/Lecturers')}>Lecturers</Button>
              <Button color="inherit" onClick={() => {
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                navigate('/HomePage');
              }}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: 0,
          width: '100vw',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to My Learning Hub!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Connect, sign up, and explore our diverse courses and expert lecturers.
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="/src/Components/Photos/image (72).png"
                alt="Advanced Learning"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Advanced Learning
                </Typography>
                <Typography variant="body1">
                  Experience cutting-edge learning with top-notch tools.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="/src/Components/Photos/image (70).png"
                alt="Modern Education"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Modern Education
                </Typography>
                <Typography variant="body1">
                  Quality education tailored to the new era.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="/src/Components/Photos/image (69).png"
                alt="Creative Innovation"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Creative Innovation
                </Typography>
                <Typography variant="body1">
                  Unlock your creativity with innovative learning methods.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
