import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardActionArea, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// רשימת הקטגוריות
const categories = [
  { name: 'קל', level: 'Low Level', image: 'path/to/easy.jpg' },
  { name: 'בינוני', level: 'Medium Level', image: 'path/to/medium.jpg' },
  { name: 'קשה', level: 'High Level', image: 'path/to/hard.jpg' },
];

// רשימת קורסים לדוגמה
const sampleCourses = [
  { id: 1, title: 'קורס בסיסי', description: 'תיאור הקורס הבסיסי', category: 'Low Level', image: 'path/to/image1.jpg' },
  { id: 2, title: 'קורס בינוני', description: 'תיאור הקורס הבינוני', category: 'Medium Level', image: 'path/to/image2.jpg' },
  { id: 3, title: 'קורס מתקדם', description: 'תיאור הקורס המתקדם', category: 'High Level', image: 'path/to/image3.jpg' },
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredCourses = selectedCategory
    ? sampleCourses.filter(course => course.category === selectedCategory)
    : sampleCourses;

  return (
    <>
      {/* תפריט עליון */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              דף הבית
            </Link>
          </Typography>
          <div>
            <Button color="inherit">
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                התחברות
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                הרשמה
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>
                קורסים
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/lecturers" style={{ textDecoration: 'none', color: 'inherit' }}>
                מרצים
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          קטגוריות
        </Typography>
        
        {/* כרטיסיות קטגוריות */}
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.level} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => setSelectedCategory(category.level)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent sx={{ backgroundColor: selectedCategory === category.level ? '#4CAF50' : '#FFFFFF' }}>
                    <Typography variant="h6" align="center" sx={{ color: selectedCategory === category.level ? '#FFFFFF' : '#000000' }}>
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* כרטיסיות קורסים */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  sx={{ pt: '56.25%' }}
                  image={course.image}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography>
                    {course.description}
                  </Typography>
                </CardContent>
                <Button size="small" color="primary">
                  למד עוד
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategoryPage;
