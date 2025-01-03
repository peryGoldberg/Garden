
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
import {useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import {userIn} from './features/user/UserSlice'
import Home from './Home';
import UpdateItem from './features/product/UpdateItem'
import '@fontsource/roboto/400.css';
import '@fontsource/rubik/400.css';
import { createTheme } from '@mui/material/styles';
import { Protected } from './Protected';
import { useSelector } from 'react-redux';
import About from './features/About';
import MyOrders from './features/order/MyOrders';
import AllOrders from './features/order/AllOrders';

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
         <Route path='About' element={ <About />} />
         <Route path='MyOrders' element={  <MyOrders /> }/>
         <Route path='AllOrders' element={ <Protected user={user} > <AllOrders /></Protected> }/>
      </Routes>
      

           
    </>
  );
}

export default App;

