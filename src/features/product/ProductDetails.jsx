
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProductDetails.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { saveProduct } from './ProductSlice'
import NavBar from '../NavBar';
import SmallShopping from '../order/SmallShopping'
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ProductDetails = () => {


  let disPatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  let details = { ...location.state };

  const handleGoBack = () => {
    navigate("/list");
  }

  saveProduct(details);
  let [cnt, setCnt] = useState(1);

  return (
    <>
      <div className="details">
        <NavBar />
        <div className='div-details'>

          <div className="p-describtion">
        

            <Typography  style={{fontSize:'30px',padding:'3%',color:'#9c27b0'}}>{details.productName}</Typography>
            <Typography sx={{direction:'rtl'}}>{details.description}</Typography>
            <Typography sx={{margin:'5%'}}><b>{` ${location.state.price}.00 ₪`}</b></Typography>

          <div>
            <ButtonGroup sx={{direction:'ltr'}} variant="outlined" color='secondary' aria-label="Basic button group">
              <Button onClick={() => {
                setCnt(cnt + 1)
              }}>
                <AddIcon />
              </Button>
              <Button>{cnt}</Button>
              <Button onClick={() => {
                if (cnt > 1)
                  setCnt(cnt - 1)
              }}>
                <RemoveIcon />
              </Button>

            </ButtonGroup>
            </div>
           
            <SmallShopping  detailsOrder={details} cnt={cnt} />
            <Button sx={{margin:'2% 2%'}} variant='contained' color='secondary' onClick={handleGoBack}><ArrowForwardIcon/>חזור לכל העציצים</Button>
      
          </div>

          <div className="img-details">
            <img src={location.state.imgUrl} />
          </div>

        </div>

      </div>
    </>
  );
};

export default ProductDetails;