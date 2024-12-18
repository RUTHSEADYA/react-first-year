import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import SigninForm from './Components/SigninForm';
import Course from './Components/Course';
import Lecturers from './Components/Lecturers';
import HomePage from './Components/HomePage';
import CategoryPage from './Components/CategoryPage';
import PersonalArea from './Components/PersonalArea';
import Personal from './Components/Personal';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/course" element={<Course />} />
        <Route path="/SigninForm" element={<SigninForm />} />
        <Route path="/LoginForm" element={<LoginForm/>} />
        <Route path="/Lecturers" element={<Lecturers/>} />
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/CategoryPage" element={<CategoryPage/>}/>
        <Route path="/PersonalArea" element={<PersonalArea/>}/>
        <Route path="/Personal" element={<Personal/>}/>

      </Routes>
    </Router>
  );
}
