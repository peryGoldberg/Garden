
import { useSelector } from 'react-redux';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ShoppingCartItem from './ShoppingCartItem';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './ShoppingCart.css'
import { Typography } from '@mui/material';
const ShoppingCart = () => {

  const navigate = useNavigate();
  let disabled=true;
  const theme = useTheme();
  let arr = useSelector(myState => myState.product.shoppingProduct);
  let disPatch = useDispatch();
  let count = () => {
    let cnt = 0;
    arr.forEach(product => {
      cnt += product.cnt
    });
    if(cnt>0)
    disabled=false;
    return cnt;
  }
 let sum = 0;
  let allsum = () => {
    sum = 0;
    arr.forEach(product => {
      sum += (product.price * product.cnt);
    });
    return sum;
  }

  let goList = () => {
    navigate('/list')
  }
  let goForm = () => {
    navigate('/OrderForm');
  }
 


 
console.log(arr)
  return (
    <>

      <Typography sx={{fontFamily: 'Varela Round', marginTop: '15%',textAlign:'center' ,fontSize:'30px'}}><b>סל קניות</b></Typography>
      <div style={{textAlign:'center' }}>
    {arr.length==0&&<Typography sx={{fontFamily: 'Varela Round'}}>לא נמצאו מוצרים בסל הקניות</Typography>}
    </div>
      <div style={{ direction: 'rtl', display: 'flex',margin:'2%',justifyContent:'space-between'}}>

       { arr.length>0&&<div>

          <table>
            <tr >
              <th style={{fontFamily: 'Varela Round', paddingRight: '270px' }}>מוצר</th>
              <th style={{fontFamily: 'Varela Round', paddingRight: '120px' }}>שינוי כמות</th>
              <th style={{fontFamily: 'Varela Round', paddingRight: '70px' }}>כמות</th>
              <th style={{fontFamily: 'Varela Round', paddingRight: '50px' }}>מחיר</th>
              <th style={{fontFamily: 'Varela Round', paddingRight: '70px' }}>סכום</th>
            </tr>
          </table>
          <ul>
            {arr.map(item => <li><ShoppingCartItem key={item._id} item={item} /></li>)}
          </ul>

        </div>}

        <div style={{padding:'2% 7%',margin:'0% 1%', border:'solid 1px #b39ddb',borderRadius: '5%'}}>
          <Typography style={{fontFamily: 'Varela Round',fontSize:'25px'}}>סך הכל בעגלה</Typography>
          <div style={{direction:'rtl', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
            <Typography style={{fontFamily: 'Varela Round'}}>
              {`  מספר מוצרים בסל:  `} {`${count()}`}
            </Typography>
            <Typography>
             
            </Typography>
            <Typography  style={{fontFamily: 'Varela Round'}}>
              סכום ביניים:  {`${allsum()}.00 ₪ `}
            </Typography>
            <Typography  style={{fontFamily: 'Varela Round'}}>
            
            </Typography>
          
          
          <div style={{gridRow: '3' , 
  gridColumn: '1'  }}>
            <Button sx={{fontFamily: 'Varela Round',width:'200%',marginBottom:'5%'}} variant='contained' color='secondary' onClick={goList}>המשך לקנות</Button>
          </div>
          <div style={{gridRow: '4' , 
  gridColumn: '1'  }}>
            <Button disabled={disabled} sx={{fontFamily: 'Varela Round',width:'200%'}}  variant='contained' color='secondary' onClick={goForm} >סיים הזמנה</Button>
          </div>
        </div>
        </div>
        </div>
      </>
      );
}

      export default ShoppingCart;
