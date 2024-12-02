import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import {  useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addShoppingProduct, saveProduct } from '../product/ProductSlice'
import {addCount} from '../product/CountSlice'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(7),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

const SmallShopping = (props) => {

  let disPatch = useDispatch();

  const navigate = useNavigate();
  let arr = useSelector(myState => myState.product.shoppingProduct);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    let detailsOrder = { ...props.detailsOrder}
  detailsOrder.cnt=props.cnt;
  console.log(props.cnt)

   disPatch(addShoppingProduct(detailsOrder)) 
  disPatch(addCount((props.cnt)))
  console.log(props.cnt)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const moveCart = () => {
    navigate('/ShoppingCart');
  };
  return (
    <React.Fragment>

      <Button variant="contained" color='secondary' onClick={handleClickOpen}>
        <ShoppingCartIcon /> {`   הוספה לסל`}  
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers >
          {arr.map((item) => (
            <div style={{ display: "flex",paddingBottom:'5%', direction: "rtl",margin:'10% 0%' ,borderBottom:'solid 1px gray'  }}>

              <Card sx={{ maxWidth: 150 }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <CardMedia
                    component="img"
                    height="80"
                    image={item.imgUrl}
                    alt="green iguana"
                  />

                </CardActionArea>
              </Card>
              <div style={{margin:'2%',direction:'rtl'}}>
              <Typography color='secondary' style={{ fontSize:'120%',width:'120%' }}> {item.productName}</Typography>
              <Typography> {item.cnt}x{item.price}.00 ₪</Typography>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button color='secondary' variant='contained' autoFocus onClick={moveCart}>
            מעבר לסל קניות
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
export default SmallShopping;