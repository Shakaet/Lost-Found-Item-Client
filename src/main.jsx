import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from './component/Mainlayout.jsx';
import Home from './component/Home.jsx';

import AuthProvider from './AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';
import LostAndFoundItemPage from './component/LostAndFoundItemPage.jsx';
import Allitems from './component/Allitems.jsx';
import Details from './component/Details.jsx';
import Myitems from './component/Myitems.jsx';
import UpdateItem from './component/UpdateItem.jsx';
import Allrecovered from './component/Allrecovered.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';
import ErrorPages from './component/ErrorPages.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPages></ErrorPages>,
    element: <Mainlayout></Mainlayout>,
    children:[
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path:"/additems",
        element:<PrivateRoute><LostAndFoundItemPage></LostAndFoundItemPage></PrivateRoute>
      },
      {
        path:"/alltimes",
        element:<Allitems></Allitems>,
        loader:()=>fetch("https://npm-server.vercel.app/itemCount")
      },
      {
        path:"/items/:id",
        element:<PrivateRoute><Details></Details></PrivateRoute>
      },
      {
        path:"/myItems",
        element:<PrivateRoute><Myitems></Myitems></PrivateRoute>
      },
      {
        path:"/updateItems/:id",
        element:<PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>

      },
      {
        path:"/allRecovered",
        element:<PrivateRoute><Allrecovered></Allrecovered></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  
    <AuthProvider>

    
      
<RouterProvider router={router} />

<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>


</AuthProvider>,

)
