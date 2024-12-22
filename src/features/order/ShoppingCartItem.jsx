
import { useSelector } from 'react-redux';
import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addCount, changeCount, removeCount } from '../product/CountSlice'

import { saveProduct, deleteProduct } from '../product/ProductSlice';
const ShoppingCartItem = ({ item }) => {
  let [cnt, setCnt] = useState(item.cnt);
  let disPatch = useDispatch();
  let allCnt = useSelector(cnt => cnt.countShopping.count);
  return (


    <div style={{ display: 'flex', direction: 'rtl', margin: '1%', gap: '2%', borderBottom: 'solid 1px #6ab04c', padding: '2%' }}>

      <Button color="secondary" >
        <DeleteIcon onClick={() => {
          disPatch(deleteProduct(item));
          disPatch(removeCount(allCnt - item.cnt));
        }} />
      </Button>
      <CardMedia sx={{ borderRadius: '5%', width: 80 }}
        component="img"

        image={item.imgUrl}
      />
      <div style={{
        width: '150px', paddingTop: '2%',
        height: '40px',
        overflow: 'auto'
      }}>{item.productName}</div>
      <div>
        <ButtonGroup sx={{ direction: 'ltr', paddingTop: '7%', width: '190px' }} variant="outlined" color='secondary' aria-label="Basic button group">
          <Button onClick={() => {
            let detailsOrder = { ...item, cnt }
            disPatch(saveProduct(detailsOrder))
            disPatch(changeCount(((allCnt - item.cnt + cnt))))
          }} >שנה</Button>
          <Button onClick={() => {
            setCnt(cnt + 1)
          }}>
            <AddIcon />
          </Button>
          <Button>{cnt}</Button>

          <Button onClick={() => {
            setCnt(cnt - 1)
          }}>
            <RemoveIcon />
          </Button>


        </ButtonGroup>

      </div>
      <div style={{
        width: '60px', paddingTop: '2%',
        height: '40px',
        overflow: 'auto'
      }}>{item.cnt}</div>
      <div style={{
        width: '150px', paddingTop: '2%',
        height: '40px',
        overflow: 'auto'
      }}>{`${item.price}.00 ₪`}</div>
      <div style={{
        width: '150px', paddingTop: '2%',
        height: '40px',
        overflow: 'auto'
      }}> {`${item.price * item.cnt}.00 ₪`}</div>

    </div>

  );
}

export default ShoppingCartItem;