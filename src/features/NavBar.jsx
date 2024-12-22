import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {  CardHeader,  Avatar } from '@mui/material';
import { userOut } from './user/UserSlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function NavBar() {
  let disPatch = useDispatch()
  let myUserOut = () => {
    disPatch(userOut());
  }


  let user = useSelector(us => us.currentUser.currentUser)?.userName
  let typeUser = useSelector(us => us.currentUser.currentUser)?.role
  console.log(typeUser)

  useEffect(() => { }, [user]);
  let cnt = useSelector(cnt => cnt.countShopping.count);
  console.log(cnt);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar  sx={{ bgcolor: "#9c27b0" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} >
            <Link to="ShoppingCart" >

              <StyledBadge sx={{color:'white'}}  badgeContent={cnt} >
                <ShoppingCartIcon sx={{color:'white'}} />
              </StyledBadge>

            </Link>

          </IconButton>
          <Typography style={{ fontFamily: 'Varela Round' }}>
            {console.log(user)}
              {user && <div style={{color:'white'}}> {`${user}`} </div>}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontFamily: 'Varela Round' }}>
            <CardHeader color="black"  avatar={<Avatar sx={{fontFamily: 'Varela Round'}} color='secondary' alt={user} src=" " />} />
             
             
          </Typography>
          
          {typeUser && <Button color='secondary' style={{ backgroundColor: "#fff",fontFamily: 'Varela Round' }} onClick={myUserOut}>התנתקות</Button>}
          {typeUser && typeUser==="USER"&&<Link to="MyOrders">  <Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>ההזמנות שלי</Button></Link>}
          
          {typeUser && typeUser === "ADMIN" && <Link to="AllOrders" >  <Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>כל הזמנות </Button></Link>} 
          {typeUser && typeUser === "ADMIN" && <Link to="AddProduct" >  <Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>הוספה</Button></Link>}
          {!typeUser && <Link to="LogIn" ><Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>התחברות</Button> </Link>}
          {!typeUser && <Link to="SignOn" >  <Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>הרשמה</Button></Link>}
          
          <Link to="list" >  <Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>כל העציצים</Button></Link>

          {/* <Link to="About" ><Button sx={{color:'#fff',fontFamily: 'Varela Round'}}>אודות </Button></Link> */}
          <Link to="" >  <Button color="inherit"><img style={{width:'70px'}} src="https://rubybot.co.il/_next/image?url=https%3A%2F%2Fapi.rubybot.co.il%2Fgenerated_images%2FFQddAPqQxqklizmanxARHKeXczvOjOotVxIwAVnzSuPtiubyVPiJoGSjmHvWtHrL.jpeg&w=640&q=75"/></Button></Link>







        </Toolbar>
      </AppBar>
    </Box>
  );
}