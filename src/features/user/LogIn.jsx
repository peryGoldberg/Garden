
import {  useNavigate } from "react-router-dom";
import { userIn } from './UserSlice';
import { useDispatch } from 'react-redux'
import { login} from './UserApi';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Typography } from '@mui/material';
let userSchema = yup.object().shape({
    userName: yup.string("יכול להיות רק מחרוזת").required(" שם הוא שדה חובה"),
    email: yup.string().required("מייל הוא שדה חובה").matches(/@gmail\.com$/, 'אימייל חייב להיות כתובת Gmail חוקית'),
    password: yup.string().required(" סיסמא היא שדה חובה").min(4, "חייב להיות מינימום 4").max(10, "חייב להיות מקסימום 10").matches(/^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[A-Z]).+$/, 'הסיסמא לא תקינה')
});



const LogIn = () => {
    const { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all",
        resolver: yupResolver(userSchema)
    });
    let dispatch = useDispatch()
    const navigate = useNavigate();
    // const Swal = require('sweetalert2')

    const onSubmit = async (details) => {
        {
            console.log(details);
            try {
                let res = await login(details)
                Swal.fire({
                    icon: "success",
                    title: "נכנסת בהצלחה",
                    showConfirmButton: false

                })
                console.log(res)
                dispatch(userIn(res.data));
                

            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "שגיאה בכניסה",
                    showConfirmButton: false,
                    text: "אם אינך משתמש רשום, עבור להרשמה",

                })
                navigate('/SignOn')
            }
        }
    }

    const goSignOn = () => {
        navigate('/SignOn');
    }
    return (
        <>


            <form style={{ padding: '10% 0%',textAlign:'center',direction:'rtl',backgroundColor:'#F0F2DA' }} onSubmit={handleSubmit(onSubmit)}>
                <LockOpenIcon style={{width:'500px',color:'#9c27b0'}}/>
                <Typography style={{color:'#9c27b0'}}>התחברות</Typography>
              
               
               
                <div style={{ margin: "flex" ,background:'#F0F2DA'}}>

                    <div id="userName" >
                        <TextField color='secondary' style={{margin:'1%', width: '30%'}} id="outlined-basic" label="שם*" htmlFor="userName" variant="outlined"
                            type="text" {...register("userName")} />

                        {errors.userName && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.userName.message}</Alert>}
                    </div>


                    <div id="email">
                        <TextField color='secondary' style={{margin:'1%', width: '30%'}} id="standard-basic" label="מייל*" htmlFor="email" variant="outlined"
                            type="email" {...register("email", { required: 'email is required' })} />

                        {errors.email && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.email.message}</Alert>}
                    </div>

                    <div id="password">
                        <TextField color='secondary' style={{margin:'1%', width: '30%'}} id="standard-basic" label="סיסמא*" htmlFor="password" variant="outlined"
                            type="password" {...register("password", { required: 'password is required' })} />
                        {errors.password && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.password.message}</Alert>}
                    </div>

                    <div style={{ margin: '2%' }}>
                        <Button type="submit" color='secondary' variant="contained" endIcon={<SendIcon />}>    שליחה   </Button>
                    </div>
                </div>
                <Typography onClick={goSignOn}>אם אינך משתמש רשום, <Button style={{textDecoration:'none',color:'#9c27b0'}}>לחץ כאן</Button></Typography>
            </form>


        </>
    );
}

export default LogIn;