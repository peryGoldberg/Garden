import { useForm } from 'react-hook-form';
import { addorder } from './OrderApi';
import * as React from 'react';
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
const OrderForm = () => {
    let minimalProduct = useSelector(myState => myState.product.shoppingProduct);
    
    let user = useSelector(us => us.currentUser.currentUser)
    let userId = useSelector(us => us.currentUser.currentUser)?._id

    const Swal = require('sweetalert2')

    const navigate = useNavigate();
  
    let goToShop = () => {
        navigate('/list')
    }

    let count = () => {
        let cnt = 0;
        minimalProduct.forEach(product => {
          cnt += product.cnt
        });
        return cnt;
      }
    
      let allsum = () => {
       let sum = 0;
        minimalProduct.forEach(product => {
          sum += (product.price * product.cnt);
        });
        return sum;
      }

      let products = [];
    const onSubmit = async (details) => {
        console.log(details);
        let address={'address':details.address}
        try {
            for (let i = 0; i < minimalProduct.length; i++) {
                products[i] = { "productName": minimalProduct[i].productName, "sum": minimalProduct[i].price * minimalProduct[i].cnt, "qty": minimalProduct[i].cnt }
            }

            let order = { ...address, userId, products }
            let res = await addorder(order, user.token)
            Swal.fire({
                icon: "success",
                title: "  ההזמנה בוצעה בהצלחה ",
                showConfirmButton: false

            })
            console.log(res)

        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "  ההזמנה לא בוצעה ",
                showConfirmButton: false,
                text: "עליך להתחבר לאתר כדי להשלים את ההזמנה",

            })
        }

       
    }
    const { control, register, handleSubmit,  formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all",
      defaultValues: { userName:user?.userName , email: user?.email ,  password:user?.password}
    });

    return (
        <>
            
                <div style={{padding:'8%' ,direction: 'rtl', display: 'flex',gap:'0%',margin:'2%',justifyContent:'space-between'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!user&&<Alert sx={{margin:'1%'}} severity='error'>שים לב- אינך מחובר. כדי להשלים את ההזמנה עליך להתחבר לאתר.  <Button style={{textDecoration:'none',color:'#9c27b0'}} onClick={()=>{navigate('/Login')}}>להתחברות לחץ כאן</Button></Alert>}
                <Typography>פרטים אישיים</Typography>

                <div style={{background:'#F0F2DA',margin:'2%',padding:'5%',gap:'5%',display:'flex'}}>
               <div>
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="standard-basic" label="שם*"  variant="outlined"
                            type="text" defaultValue={user?.userName}  {...register("userName", { required: 'userName is required' })}/>

                        {errors.userName && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>


                    
                    <div >
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="standard-basic" label="מייל*"  variant="outlined"
                           defaultValue={user?.email} type="email"  {...register("email", { required: 'email is required' })}/>

                        {errors.email && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>

                    
                    
                </div>
                <Typography>כתובת וטלפון</Typography>
                <div style={{background:'#F0F2DA',padding:'5%',gap:'5%',margin:'2%',display:'flex'}}>
                    <div id="phone" >
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="outlined-basic" label="טלפון" htmlFor="phone" variant="outlined"
                            type="text" />
                    </div>

                   
                    <div id="address">
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="standard-basic" label="רחוב*" htmlFor="address" variant="outlined"
                            type="text" {...register("address", { required: 'address is required' })} />

                        {errors.address && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>

                    <div id="number" style={{width:'15%'}}>
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="standard-basic" label="מספר"  variant="outlined"
                            type="number"  />

                    </div>

                    <div id="address">
                        <TextField color='secondary' style={{margin:'1%', width: '110%'}} id="standard-basic" label="עיר"  variant="outlined"
                            type="text"  />
                    </div>
                    </div>
                 
                   <Typography> תשלום</Typography>
                   <div style={{background:'#F0F2DA',padding:'5%',gap:'5%',margin:'2%',display:'flex',justifyContent:'center',flexDirection:'column'}}>
                   <div id="numAcount" style={{gridRow: '1' ,  gridColumn: '1' , display: 'flex', alignItems: 'flex-end' }}>
                   <PaymentOutlinedIcon sx={{  mr: 1, my: 2,color:'#9c27b0'  }} />                     
                        <TextField color='secondary' style={{margin:'1%', width: '90%'}} id="standard-basic" label="מספר אשראי*" htmlFor="numAcount" variant="outlined"
                            type="number"   {...register("num", { required: 'num is required' })}/>
                        {errors.num && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>

                    <div id="tz" style={{ display: 'flex', alignItems: 'flex-end'}}>
                    <AccountCircleOutlinedIcon sx={{mr: 1, my: 2,color:'#9c27b0'  }} />
                        <TextField color='secondary' style={{margin:'1%', width: '90%'}} id="standard-basic" label="ת.ז בעל הכרטיס*" htmlFor="tz" variant="outlined"
                            type="number"   {...register("tz", { required: 'tz is required' })}/>
                       {errors.tz && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <div  style={{flex:'1', display: 'flex', alignItems: 'flex-end'}}>
                    <HttpsOutlinedIcon sx={{  mr: 1, my: 2,color:'#9c27b0'  }} />
                        <TextField color='secondary' style={{margin:'4%', width: '90%'}} id="standard-basic" label="CVV*"  variant="outlined"
                            type="text" defaultValue='CVV'  {...register("cvv", { required: 'cvv is required' })}></TextField>
                                   {errors.cvv && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>
                    <div  style={{flex:'4', display: 'flex', alignItems: 'flex-end'}}>
                    <TodayOutlinedIcon sx={{  mr: 1, my: 2,color:'#9c27b0' }} />
                    <LocalizationProvider sx={{bgColor:'#9c27b0 '}} dateAdapter={AdapterDayjs}>
                     <DatePicker  color='secondary' sx={{margin:'1%', width: '87%',color:'#9c27b0'}} />
                    </LocalizationProvider>
                           {errors.date && <Alert style={{ margin: "0% 0%" }} severity="error">שדה חובה</Alert>}
                    </div>
                  </div>
                   </div>
                    <Button sx={{ width: '100%',margin:'1%' }} variant='contained' color='secondary' type="submit">סיים הזמנה</Button>
                    <Button sx={{ width: '100%',margin:'1%' }} variant='contained' color='secondary' onClick={goToShop}> חזור לחנות </Button>

                </form>
                <div style={{fontFamily:'Ariel', padding: '1% 3%', margin: '0% 1%', border: 'solid 1px #b39ddb', borderRadius: '5%' }}>
                    <Typography sx={{fontSize:'30px'}}>סך הכל בעגלה</Typography>
                    <div style={{width:'100%', direction: 'rtl', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
                        <Typography>
                            {`  מספר המוצרים   `}
                        </Typography>
                        <Typography>
                            {`:    ${count()}`}
                        </Typography>
                        <Typography>
                            סכום 
                        </Typography>
                        <Typography>
                            {`${allsum()}.00 ₪ `}
                        </Typography>

                        
                        <div style={{
                            gridRow: '3',
                            gridColumn: '1'
                        }}>
                        </div>
                    </div>

              </div>
              </div>
            </>
            );
}

            export default OrderForm;