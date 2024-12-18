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
  TextField,
  DialogContentText
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCourses, deleteCourse, addCourse, updateCourse } from './Api';
import CloseIcon from '@mui/icons-material/Close';
import PersonalArea from './PersonalArea';

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

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', image: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response && response.data) {
          setCourses(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      setIsAdmin(true);
    }
  }, []);

  const showPop = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async () => {
    if (courseToDelete) {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));

      if (loggedInUser) {
        if (loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
          console.log("Admin authenticated, proceeding with deletion");
          try {
            const response = await deleteCourse(courseToDelete.id);
            console.log('Response from delete API:', response);

            if (response.status === 204) {
              setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseToDelete.id));
              alert("Course deleted successfully!");
            }
          } catch (error) {
            console.error('Error deleting course:', error);
            alert("An error occurred");
          }
        } else {
          alert("Authorized personnel only");
        }
      } else {
        alert("You must be logged in to delete a course");
      }
      setConfirmDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleConfirmDelete = (course) => {
    setCourseToDelete(course);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const handleAddCourse = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      console.log("Admin authenticated, proceeding with addition");
      try {
        const response = await addCourse(newCourse);
        console.log('Response from add API:', response);

        if (response.status === 201) {
          setCourses((prevCourses) => [...prevCourses, response.data]);
          alert("Course added successfully!");
          handleCloseAddDialog();
        }
      } catch (error) {
        console.error('Error adding course:', error);
        alert("An error occurred");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleOpenUpdateDialog = (course) => {
    setSelectedCourse(course);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateCourse = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser && loggedInUser.username === 'manager' && loggedInUser.password === '1234') {
      console.log("Admin authenticated, proceeding with update");
      try {
        const response = await updateCourse(selectedCourse.id, selectedCourse);
        console.log('Response from update API:', response);

        if (response.status === 200) {
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === selectedCourse.id ? selectedCourse : course
            )
          );
          alert("Course updated successfully!");
          handleCloseUpdateDialog();
        }
      } catch (error) {
        console.error('Error updating course:', error);
        console.error(error?.response?.status);
        alert("An error occurred");
      }
    } else {
      alert("Authorized personnel only");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ zIndex: theme.zIndex.appBar, width: '100%', left: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Courses
          </Typography>
          <Button color="inherit" onClick={() => navigate('/Course')}>Courses</Button>
          <Button color="inherit" onClick={() => navigate('/HomePage')}>Home Page</Button>

          <Button color="inherit" onClick={() => navigate('/Lecturers')}>Lecturers</Button>
          <Button color="inherit" onClick={() => navigate('/SigninForm')}>Sign Up</Button>
          <Button color="inherit" onClick={() => navigate('/LoginForm')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/PersonalArea')}>Personal Area</Button>


        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>

        <Typography variant="h4" align="center" gutterBottom>
          Programming Courses
        </Typography>

        {isAdmin && (
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Button onClick={handleOpenAddDialog} variant="contained" color="primary">
              Add Course
            </Button>
          </Box>
        )}

<Grid container spacing={2} sx={{ width: '100%' }}>
  {courses.map((course, index) => (
    <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Card sx={{ height: '100%', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, maxWidth: '300px', flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={course.image || 'src/Components/Photos/Default_A_sleek_silver_and_black_desktop_computer_sits_atop_a_0.jpg'}
          alt={course.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: theme.palette.primary.main }}>
            {course.name}
          </Typography>
        </CardContent>
        <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
          <Button onClick={() => showPop(course)} variant="outlined" color="secondary" sx={{ mb: 2 }}>
            Learn More
          </Button>
          {isAdmin && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button onClick={() => handleConfirmDelete(course)} variant="outlined" color="error">
                Delete
              </Button>
              <Button onClick={() => handleOpenUpdateDialog(course)} variant="outlined" color="primary">
                Update
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>


        <Dialog open={dialogOpen} onClose={handleCloseDialog} TransitionComponent={Transition} keepMounted>
          <DialogTitle>
            {selectedCourse ? selectedCourse.name : ''}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>{selectedCourse ? selectedCourse.description : ''}</Typography>
          </DialogContent>
        </Dialog>

        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Course</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Course Name"
              type="text"
              fullWidth
              value={newCourse.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Course Description"
              type="text"
              fullWidth
              value={newCourse.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="image"
              label="Image URL"
              type="text"
              fullWidth
              value={newCourse.image}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddCourse} color="primary">
              Add Course
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Course</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Course Name"
              type="text"
              fullWidth
              value={selectedCourse?.name || ''}
              onChange={(e) =>
                setSelectedCourse((prevCourse) => ({ ...prevCourse, name: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              name="description"
              label="Course Description"
              type="text"
              fullWidth
              value={selectedCourse?.description || ''}
              onChange={(e) =>
                setSelectedCourse((prevCourse) => ({ ...prevCourse, description: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              name="image"
              label="Image URL"
              type="text"
              fullWidth
              value={selectedCourse?.image || ''}
              onChange={(e) =>
                setSelectedCourse((prevCourse) => ({ ...prevCourse, image: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateCourse} color="primary">
              Update Course
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmDeleteDialogOpen}
          onClose={handleCloseConfirmDeleteDialog}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to delete this course?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteCourse} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
