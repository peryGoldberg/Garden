
// import { border } from "@mui/system";
import "./Home.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Login from './features/user/LogIn'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import Karusale from './Karusale.js';
import  { useState, useEffect } from 'react';

const Home = () => {
    const image = [
      "https://www.ikea.com/ext/ingkadam/m/43e5470c2c881c2a/original/PH190463.jpg?f=xs",
      "https://www.ikea.com/ext/ingkadam/m/73496a6c49ec8659/original/PH196616.JPG?f=xl",
      "https://www.ikea.com/images/-3ebbd76cf03171f7aa8e6e7101e6a968.jpg?f=sg",
      "https://www.ikea.com/ext/ingkadam/m/73496a6c49ec8659/original/PH196616.JPG?f=xl"
    ];
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      },3000);
  
      return () => clearInterval(interval);
    }, [image.length]);

    const images = [
  {
    url: 'https://www.ikea.com/ext/ingkadam/m/2026e13917fc680/original/PH196683.JPG?f=xs',
    title: 'עציצים',
    width: '40%',
  },
  {
    url: 'https://www.ikea.com/ext/ingkadam/m/73496a6c49ec8659/original/PH196616.JPG?f=xl',
    title: 'גינות',
    width: '30%',
  },
  {
    url: 'https://www.ikea.com/ext/ingkadam/m/43e5470c2c881c2a/original/PH190463.jpg?f=xs',
    title: 'שתילים',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));


    const ImageMarked = styled('span')(({ theme }) => ({
          height: 3,
          width: 18,
          backgroundColor: theme.palette.common.white,
          position: 'absolute',
          bottom: -2,
          left: 'calc(50% - 9px)',
          transition: theme.transitions.create('opacity'),
        }));
        
    let navigate = useNavigate();

    return (

        <>
            <div className="home">
          <div className="header-img" >
                    <img style={{ width: "100%", marginTop: "-150px",opacity:'0.7' }} src="https://www.ikea.com/images/-3ebbd76cf03171f7aa8e6e7101e6a968.jpg?f=sg"
        alt={`Image ${currentImageIndex + 1}`} />
                </div>

                {/* <div className="header-img" style={{backgroundColor:'black', width: "100%", height: "600px", overflow: "hidden",opacity:0.9 }}>
                    <img style={{ width: "100%", marginTop: "-150px",opacity:'0.7' }} src={image[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`} />
                </div> */}
                <Typography sx={{fontSize:'30px',margin:'1%'}}>גינה חלומית או מרפסת מפנקת? </Typography>
                <Typography sx={{fontSize:'20px',margin:'0% 30%'}}>הוספה של צמחים ופרחים לחלל תורמת לתחושת הרווחה הכללית, מפחיתה לחצים ומעודדת יצירתיות. לכן הרעיונות שלנו למתנות ירוקות גם יעזרו לכם לשמח את יקיריכם עם פריט יפה, וגם ישפרו את חיי היום-יום שלהם. </Typography>
 
                <div style={{margin:'2%'}}>
                <Button variant="contained" color="secondary" onClick={()=>{ navigate('/list')  }}
                   
              >לכל המוצרים</Button>
                </div>

              
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '90%',margin:'0% 4%'}}>
       {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
                <Login/>
            </div>
        </>
    );
}

export default Home;