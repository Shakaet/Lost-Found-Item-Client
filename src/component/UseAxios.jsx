import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://npm-server.vercel.app',
    withCredentials: true // Correct property name and syntax
  });

const UseAxios = () => {
    let{signOuts}= useContext(AuthContext)
    let link =   useNavigate()


    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=> {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, error=> {
           


            if(error.status===401 || error.status===401){
               signOuts()
               .then(res=>{
               
                link("/login")

               })
               .catch(error=>{
             
               })
            }
            return Promise.reject(error);
          });
    },[link, signOuts])




    return axiosInstance
   
};

export default UseAxios;