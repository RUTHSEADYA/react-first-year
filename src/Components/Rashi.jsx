import React from 'react'
import { Log_in } from '../Components/Api'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import App from '../App';



// const nav = useNavigate();

//     const Checks_if_the_user_exists = async (user) => {
//         const response = await Log_in(user);
//         console.log(response)
//         if(response.status === 404){
//           nav('./SigninForm')
//         }
//         else if(response.status === 401){
//           nav('./LoginForm')
//         }
//         else if(response.status === 200){
//           nav('./Course')
//         }
//   }
//   console.log("response",response);


