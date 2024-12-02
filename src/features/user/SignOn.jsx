


import {userIn,userOut} from './UserSlice';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import {  getAllUsers } from './UserApi';
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { addUser } from './UserApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import './SignOn.css'


let userInSchema = yup.object().shape({
  userName: yup.string("יכול להיות רק מחרוזת").required(" שם הוא שדה חובה"),
  email: yup.string().required("מייל הוא שדה חובה").matches(/@gmail\.com$/, 'אימייל חייב להיות כתובת Gmail חוקית'),
  password: yup.string().required(" סיסמא היא שדה חובה").min(4, "חייב להיות מינימום 4").max(10, "חייב להיות מקסימום 10").matches(/^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[A-Z]).+$/, 'הסיסמה חייבת להכיל לפחות 2 אותיות ולפחות אות אחת גדולה')
});
const SignOn = () => {
  let [users,setUsers]= useState([]);
  useEffect(() => {
    async function fetchData() {
        let userAll = await getAllUsers();
        setUsers(userAll);
console.log([...users])
    }
    fetchData();
}, []);

    let dispatch=useDispatch();
    // const Swal = require('sweetalert2')
    const { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
      mode: "all",
      resolver: yupResolver(userInSchema)
  });
    const onSubmit = async (details) => {
        console.log(details);
        console.log(JSON.stringify(details));
        try {
         
            for (let i = 0; i < users.length; i++) {
              console.log(details.userName)
              console.log(details.email)
              console.log(users[i].email)
              console.log(users[i].userName)
              
              if(details.userName===users[i].userName){
                
                alert('שגיאה!')
                 return;
              }
              if(details.email===users[i].email){
                alert('שגיאה!')
                 return;
              }
              if(details.password===users[i].password){
                alert('שגיאה!')
                 return;
              }
               
            }
            let res = await addUser(details)
               dispatch(userIn(res.data));
            Swal.fire({
                icon: "success",
                title: "נוספת בהצלחה",
                showConfirmButton: false
             
              })
            console.log(res)

        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה בהוספה",
                showConfirmButton: false,
                text: err.message,
                
              })
        }
    };
  
    return ( 
       <>
       <div className='container'>
        <div className='image-container'  style={{ width: "100%", height: "100vh", overflow: "hidden",opacity:0.8 }}>
          <img style={{ width: "100%", marginTop: "50px" }} src="https://www.ikea.com/ext/ingkadam/m/4cf36e52a387f6ab/original/PH184043.jpg?f=s"/>
        </div>
       <div className='form-container'>
        <form className='form' style={{marginTop:'4%',direction:'rtl'}} onSubmit={handleSubmit(onSubmit)}>
             <Box sx={{  marginTop: '15%',color:'#9c27b0' ,fontFamily: '', fontSize: 'h3.fontSize'}}> אזור אישי</Box>
            
            <div style={{display:'grid',  gridTemplateColumns: 'repeat(2,1fr)',gap:'20% 4%',margin:'0% 15%'}}>
            
            <div  id="userName" style={{direction:'rtl'}}>
                 <TextField color='secondary' style={{ width: '100%' }} id="standard-basic" label="שם*" htmlFor="userName" variant="standard" 
                   type="text" {...register("userName")} />
               
                {errors.userName &&    <Alert severity="error">{errors.userName.message}</Alert>}
            </div>

            <div   id="email">
                 <TextField color='secondary' style={{ width: '100%' }} id="standard-basic" label="מייל*" htmlFor="email" variant="standard" 
                   type="email" {...register("email")} />
               
                {errors.email &&    <Alert severity="error">{errors.email.message}</Alert>}
            </div>
           
            <div  id="password">
                 <TextField color='secondary' style={{ width: '100%' }} id="standard-basic" label="סיסמא*" htmlFor="password" variant="standard" 
                   type="password" {...register("password")} />
               
                {errors.password &&    <Alert severity="error">{errors.password.message}</Alert>}
            </div>
            <div  id="number">
                 <TextField color='secondary' style={{ width: '100%' }} id="standard-basic" label="טלפון" variant="standard" 
                   type="number"  />
               
            </div>
            </div>
            <div style={{margin:'4% 15%'}}>
            
            <TextField  color='secondary' id="standard-basic"  variant="standard"  fullWidth label="כמה מילים"/>
            </div>
           
           <div style={{margin:'2%'}}>
          
            <Button style={{color:'#F0F2DA'}} color='secondary'  type="submit" variant="contained"  endIcon={<SendIcon />}>    שליחה   </Button>
           

</div>

        </form>
        </div>
        </div>
        </>
     );
}
 
export default SignOn;