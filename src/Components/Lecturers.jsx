import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
  TextField
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getLectures, deleteLectur, addLecturers, updateLecture } from './Api'; // עדכן נתיב לפי הצורך
import CloseIcon from '@mui/icons-material/Close';

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
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Lecturers() {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newLecturer, setNewLecturer] = useState({ name: '', profession: '', phon: '', adress: '', Years_of_experience: '', imageUrl: '' });
  const [updatedLecturer, setUpdatedLecturer] = useState({ name: '', profession: '', phon: '', adress: '', Years_of_experience: '', imageUrl: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await getLectures();
        if (response && response.data) {
          setLecturers(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (err) {
        console.error('Error fetching lecturers:', err);
      }
    };

    fetchLecturers();

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      setIsAdmin(true);
    }
  }, []);

  const showPop = (lecturer) => {
    setSelectedLecturer(lecturer);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLecturer(null);
  };

  const handleDeleteLecturer = async (lecturerId) => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser) {
      if (loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
        console.log("Admin authenticated, proceeding with deletion");
        try {
          const response = await deleteLectur(lecturerId);
          console.log('Response from delete API:', response);

          if (response.status === 204) {
            setLecturers((prevLecturers) => prevLecturers.filter(lecturer => lecturer.id !== lecturerId));
            alert("Lecturer deleted successfully!");
          }
        } catch (error) {
          console.error('Error deleting lecturer:', error);
          alert("An error occurred");
        }
      } else {
        alert("Authorized personnel only");
      }
    } else {
      alert("You must be logged in to delete a lecturer");
    }
  };

  const handleAddLecturer = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      console.log("Admin authenticated, proceeding with addition");
      try {
        const response = await addLecturers(newLecturer);
        console.log('Response from add API:', response);

        if (response.status === 201) {
          setLecturers((prevLecturers) => [...prevLecturers, response.data]);
          alert("Lecturer added successfully!");
          handleCloseAddDialog();
        }
      } catch (error) {
        console.error('Error adding lecturer:', error);
        alert("An error occurred");
      }
    } else {
      alert("Authorized personnel only");
    }
  };
  const handleUpdateLecturer = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
  
    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      console.log("Admin authenticated, proceeding with update");
      try {
        const response = await updateLecture(selectedLecturer.id, selectedLecturer);
        console.log('Response from update API:', response);
  
        if (response.status === 200) {
          // עדכון המורה במצבים (במידה והשרת מחזיר את המורה המעודכן)
          setLecturers((prevLecturers) => prevLecturers.map((lecturer) =>
            lecturer.id === selectedLecturer.id ? response.data : lecturer
          ));
          alert("Lecturer updated successfully!");
          handleCloseUpdateDialog();
        } else {
          alert("Failed to update lecturer.");
        }
      } catch (error) {
        console.error('Error updating lecturer:', error);
        alert("An error occurred while updating the lecturer.");
      }
    } else {
      alert("Authorized personnel only");
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };



  const handleOpenUpdateDialog = (lecturer) => {
    setSelectedLecturer(lecturer);
    setUpdatedLecturer(lecturer);
    setOpenUpdateDialog(true);
  };


  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    //setSelectedLecturer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLecturer((prevLecturer) => ({ ...prevLecturer, [name]: value }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLecturer((prevLecturer) => ({ ...prevLecturer, [name]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ zIndex: theme.zIndex.appBar, width: '100%', left: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Lecturers
          </Typography>
          <Button color="inherit" onClick={() => navigate('/Course')}>Courses</Button>
          <Button color="inherit" onClick={() => navigate('/Lecturers')}>Lecturers</Button>
          <Button color="inherit" onClick={() => navigate('/SigninForm')}>Sign up</Button>
          <Button color="inherit" onClick={() => navigate('/LoginForm')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/HomePage')}>Home Page</Button>

        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Lecturers
        </Typography>

        {isAdmin && (
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Button onClick={handleOpenAddDialog} variant="contained" color="primary">
              Add Lecturer
            </Button>
          </Box>
        )}

        <Grid container spacing={2}>
          {lecturers.map((lecturer, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={lecturer.imageUrl || '/src/Components/Photos/image (78);.png'} // Use default image if none provided
                  alt={lecturer.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: theme.palette.primary.main }}>
                    {lecturer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lecturer.profession}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    Phone: {lecturer.phon}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {lecturer.adress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Years of Experience: {lecturer.Years_of_experience}
                  </Typography> */}
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                  <Button variant="outlined" color="secondary" onClick={() => showPop(lecturer)}>
                    Learn More
                  </Button>
                  {isAdmin && (
                    <>
                      <Button variant="outlined" color="primary" onClick={() => handleOpenUpdateDialog(lecturer)} sx={{ marginLeft: 2 }}>
                        Update
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteLecturer(lecturer.id)} sx={{ marginLeft: 2 }}>
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} TransitionComponent={Transition} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedLecturer ? selectedLecturer.name : 'Lecturer Details'}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedLecturer && (
            <>
              <Typography variant="h6">Name: {selectedLecturer.name}</Typography>
              <Typography variant="body1">Profession: {selectedLecturer.profession}</Typography>
              <Typography variant="body1">Phone: {selectedLecturer.phon}</Typography>
              <Typography variant="body1">Address: {selectedLecturer.adress}</Typography>
              <Typography variant="body1">Years of Experience: {selectedLecturer.Years_of_experience}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Lecturer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newLecturer.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="profession"
            label="Profession"
            type="text"
            fullWidth
            variant="outlined"
            value={newLecturer.profession}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phon"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={newLecturer.phon}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="adress"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={newLecturer.adress}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Years_of_experience"
            label="Years of Experience"
            type="number"
            fullWidth
            variant="outlined"
            value={newLecturer.Years_of_experience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newLecturer.imageUrl}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddLecturer}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Lecturer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedLecturer.name}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="profession"
            label="Profession"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedLecturer.profession}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="phon"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedLecturer.phon}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="adress"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedLecturer.adress}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="Years_of_experience"
            label="Years of Experience"
            type="number"
            fullWidth
            variant="outlined"
            value={updatedLecturer.Years_of_experience}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedLecturer.imageUrl}
            onChange={handleUpdateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button onClick={handleUpdateLecturer}>Update</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
