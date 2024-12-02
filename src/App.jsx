// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <h1>שלום</h1>
      
//     </>
//   )
// }

// export default App;

import './App.css';
import ProductList from './features/product/ProductList'
import NavBar from './features/NavBar';
import ShoppingCart from './features/order/ShoppingCart';
import OrderForm from './features/order/OrderForm';
import AddProduct from './features/product/AddProduct';
import ProductDetails from './features/product/ProductDetails';
import { Routes, Route } from 'react-router-dom';
import LogIn from './features/user/LogIn'
import SignOn from './features/user/SignOn'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {userIn} from './features/user/UserSlice'
import Home from './Home';
import UpdateItem from './features/product/UpdateItem'
import '@fontsource/roboto/400.css';
import '@fontsource/rubik/400.css';
import { createTheme } from '@mui/material/styles';
import { Protected } from './Protected';
import { useSelector } from 'react-redux';
function App() {
  let user = useSelector(us => us.currentUser.currentUser)


  let dispatch=useDispatch()
  useEffect(() => {
    let u = localStorage.getItem("myUser");
    if(u)
    dispatch(userIn(JSON.parse(u)));
  }, []);
  return (
    <>
  

      <NavBar />
      <Routes>
        <Route path='' element={<Home/>}/>
      <Route path="list" element={<ProductList />}>
        <Route path=":id" element={<ProductDetails />} />
      </Route>
        <Route path="ShoppingCart" element={<ShoppingCart />} />
        <Route path="OrderForm" element={<OrderForm />} />
         <Route path="LogIn" element={<LogIn />} /> 
         <Route path="SignOn" element={<SignOn />} /> 
         <Route path="UpdateItem" element={<Protected user={user} > <UpdateItem/> </Protected>} /> 
         <Route path='AddProduct' element={<Protected user={user} > <AddProduct /> </Protected>} />
      </Routes>


     
         
           
    </>
  );
}

export default App;

