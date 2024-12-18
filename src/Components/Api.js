import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


    axios.defaults.baseURL ='http://localhost:8080/api';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    axios.defaults.headers.post['Accept'] = 'application/json';



//============================================log in
const Log_in = async (userDate) => {
    try {
        const response = await axios.post('/users/Log_in', userDate);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }


};

// export const Log_in = async (user) => {
//     try {
//       const response = await axios.post('/users/Log_in', user);
//       return response;
//     } catch (error) {
//       console.error('Error in Log_in function:', error);
//       throw error;
//     }
// }
//============================================sign in
    const sign_in = async (u) =>{
        axios.post('/users/sign_in',u)
        .then(response=> {
            console.log('response', response);
            return response;
        })
        .catch(err=> console.log('err', err))
        throw err; 
    }


 //============================================2
      const post_addCategory = () =>{
        axios.post('/categories/addCategory')
        .then(response=> {
            console.log('response', response);
            return response;
        })
        .catch(err=> console.log('err', err))
    }

 //==============================================3
      const deleteCategory = () =>{
        axios.delete('/categories/deleteCategory')
        .then(response=> {
            console.log('response', response);
            return response;
        })
        .catch(err=> console.log('err', err))
    }


 //==============================================4
          const getCategories = () =>{
            axios.get('/categories/getCategories')
            .then(response=> {
                console.log('response', response);
                return response;
            })
            .catch(err=> console.log('err', err))
        }


//==============================================5
          const getCategories_withId = (id) =>{
            axios.get('/categories/getCategories/${id}')
            .then(response=> {
                console.log('response', response);
                return response;
            })
            .catch(err=> console.log('err', err))
        }

 //==============================================6
            const updateCategory = () =>{
                axios.get('/categories/updateCategory')
                .then(response=> {
                    console.log('response', response);
                    return response;
                })
                .catch(err=> console.log('err', err))
            }


 //==============================================7


 const getLectures = () => {
    return axios.get('/lectures/getLectures');
  };
  
  const deleteLectur = (id) => {
    return axios.delete(`/lectures/deleteLectur/${id}`);
};
 const addLecturers = (lecturer) => {
    return axios.post('/lectures/addLecturers', lecturer);
  };
  
 const getLectur_withId = (id) => {
    return axios.get(`/lectures/getLectur/${id}`);
  };
 const updateLecture = (id, lecturer) => {
    return axios.put(`/lectures/updateLecture/${id}`, lecturer);
  };
//                const addLecturers = () =>{
//                 axios.post('/lectures/addLecturers')
//                 .then(response=> {
//                     console.log('response', response);
//                     return response;
//                 })
//                 .catch(err=> console.log('err', err))
//             }

//  //==============================================8 
//                const deleteLectur = () =>{
//                 axios.delete('/lectures/deleteLectur')
//                 .then(response=> {
//                     console.log('response', response);
//                     return response;
//                 })
//                 .catch(err=> console.log('err', err))
//             }


//  //==============================================9
//                const getLectur_withId = (id) =>{
//                 axios.get('/lectures/getLectur/{id}')
//                 .then(response=> {
//                     console.log('response', response);
//                     return response;
//                 })
//                 .catch(err=> console.log('err', err))
//             }
    

// //==============================================10
//                const getLectures = () =>{
//                 axios.get('/lectures/getLectures')
//                 .then(response=> {
//                     console.log('response', response);
//                     return response;
//                 })
//                 .catch(err=> console.log('err', err))
//             }

// //==============================================11
//               const updateLecture = () =>{
//                 axios.get('/lectures/updateLecture')
//                 .then(response=> {
//                     console.log('response', response);
//                     return response;
//                 })
//                 .catch(err=> console.log('err', err))
//             }
            
//==============================================12
const addUser = async (user) => {
    try {
      const response = await axios.post('/users/addUser', user);
      console.log('response', response);
      return response;
    } catch (err) {
      console.error('Error adding user:', err.response ? err.response.data : err.message);
      throw err;
    }
    }

//==============================================13
const deletUser = (id) => {
  return axios.delete(`/users/deletUser/${id}`);
};

//==============================================14
            const getUsers = () =>{
                axios.get('/users/getUsers')
                .then(response=> {
                    console.log('response', response);
                    return response;
                })
                .catch(err=> console.log('err', err))
            }

//==============================================15
// const getUserById = (id) => {
//     axios.get(`/users/getUserById/${id}`)
//       .then(response => {
//         console.log('response', response);
//         return response;
//       })
//       .catch(err => console.log('err', err));
//   }
const getUserByName = (name) => {
    return axios.get(`/users/getUserByName/${name}`);
  };
  
//==============================================16
            // const updateUsers = () =>{
            //     axios.get('/users/updateUsers')
            //     .then(response=> {
            //         console.log('response', response);
            //         return response;
            //     })
            //     .catch(err=> console.log('err', err))
            // }
            const updateUsers = (user,id) => {
              return axios.put(user,`/user/updateUsers/${id}`);
            };
            const findName= async (name) => {
              try {
                  const response = await axios.post('/useres/findName',  name );
                  console.log('response', response);
                  return response;
              } catch (err) {
                  console.log('err', err);
                  throw err;
              }
          }
//==============================================17
            // const addCourse = () =>{
            //     axios.post('/courses/addCourse')
            //     .then(response=> {
            //         console.log('response', response);
            //         return response;
            //     })
            //     .catch(err=> console.log('err', err))
            // }


 const addCourse = (course) => {
    return axios.post('/courses/addCourse', course);
}

//==============================================18
const deleteCourse = async (id) => {
    try {
      // עדכון ה-URL לכולל את ה-ID בפורמט הנכון
      const response = await axios.delete(`/courses/deleteCourse/${id}`);
      return response;
    } catch (error) {
      console.error('Error in deleteCourse function:', error);
      throw error; // Throw the error to be caught in handleDeleteCourse
    }
  }
            
              

//==============================================19
            const getCourse_withId = (id) =>{
                axios.get('/courses/getCourse/{id}')
                .then(response=> {
                    console.log('response', response);
                    return response;
                })
                .catch(err=> console.log('err', err))
            }

//==============================================20
const getCourses = () => {
    return axios.get('/courses/getCourses')
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(err => {
        console.log('err', err);
        throw err; // כדי שהשגיאה תתפוס גם בקוד הקורא
      });
  }

//==============================================21

// const updateCourse = async (course) => {
//     try {
//       const response = await axios.put(`/courses/updateCourse/${course.id}`, course);
//       return response;
//     } catch (error) {
//       console.error('Error updating course:', error);
//       throw error;
//     }
//   };

const updateCourse = (id, course) => {
    return axios.put(`/courses/updateCourse/${id}`, course);
  };

        export {Log_in,sign_in,post_addCategory,deleteCategory,getCategories,
            getCategories_withId,updateCategory,addLecturers,deleteLectur,getLectur_withId,
            getLectures,updateLecture,addUser,deletUser,getUsers,getUserByName,updateUsers,
            addCourse,deleteCourse,getCourse_withId,getCourses,updateCourse,findName
        }

  