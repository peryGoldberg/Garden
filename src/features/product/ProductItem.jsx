import * as React  from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Stack from '@mui/material/Stack';
import {useDispatch} from 'react-redux';
import {addShoppingProduct} from './ProductSlice'
import {addCount} from '../product/CountSlice'
import { useSelector } from 'react-redux';
import { deleteProductById } from './ProductApi';
import { useEffect,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import {selectProductForEdit} from './ProductSlice';
const  ProductItem= ({one,remove,setRemove}) => {
//   const Swal = require("sweetalert2");

  let navigate=useNavigate();
   const [flag, setFlag] = useState(true);
  let cart=useSelector(myState=>myState.product.shoppingProduct);
  useEffect(()=>{
    for (let i = 0; i < cart.length; i++) {
      if(cart[i]._id===one._id)
      setFlag(false);
    }
  },[]);
  let typeUser = useSelector(us => us.currentUser.currentUser)?.role
  let user = useSelector(us => us.currentUser.currentUser)
 
  let addOne=(e)=>{
    console.log(flag)
    setFlag(false)
    console.log(flag)
    e.preventDefault();
    let item={...one,cnt:1}
    disPatch(addShoppingProduct(item))
    disPatch(addCount((1)))
  }

  let goToUpdate=(e)=>{
e.preventDefault();
    navigate("/UpdateItem")
  }

  let disPatch = useDispatch();
  let plus=false;
 let update=(e)=>{
  e.preventDefault();
  disPatch(selectProductForEdit(one)) 
  navigate('/UpdateItem')
 }
let removItem=(e)=>{
  e.preventDefault();

//   Swal.fire({
//     title: "?האם אתה בטוח שברצונך למחוק",
//     icon: "warning",
//     showCancelButton: true,
    
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "yes!"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       console.log(one._id)
//   deleteProductById(one._id,user.token).then(res => {
//     //   Swal.fire({
//     //     title: "!נמחק",
//     //     text: "המוצר שלך נמחק בהצלחה",
//     //     icon: "success"
//     //   });
//     setRemove(!remove);
// }).catch((err) => { alert("התרחשה שגיאה") })
//     }
//   });

  

}

    return (
        <>
        <div style={{listStyleType: 'none',
    textDecoration: 'none'}}> 
        <Card sx={{ maxWidth: 400 }} >
     
      <CardMedia 
        component="img"
        height="350"
       
        image={one.imgUrl}
        alt="Paella dish"
      />
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <Typography >
        {`${one.price}.00 ₪`}
        </Typography>
        <IconButton aria-label="share">

         {(!typeUser || typeUser=="USER")&&flag&&<ShoppingCartIcon  onClick={addOne}/>}
        { (!typeUser || typeUser=="USER")&&!flag&&<AddShoppingCartIcon  color="secondary" onClick={addOne}/>}
        </IconButton>
        

         {typeUser&&typeUser=="ADMIN"&&
         <Link to={'updateItem/'+ one._id} state={one}>
         <Button onClick={update} variant="contained" color='secondary' style={{margin:'1%'}}
           >עריכה</Button></Link>}
         {typeUser&&typeUser=="ADMIN"&&<Link sx={{margin:'1%'}} ><Button variant="contained" color='secondary'  onClick={removItem}>מחיקה</Button></Link>}  
                   
        <Typography sx={{m:1}}>{one.productName}</Typography>
        
        
         <Stack direction="row" spacing={2}>
    </Stack>

       
      </CardActions>
      <Collapse  timeout="auto" unmountOnExit>
        <CardContent>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    </>
      );
}
 
export default ProductItem;
