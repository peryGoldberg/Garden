
import * as React  from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addCount,removeCount} from './CountSlice'

const ButtonDelete = () => {
  let cnt = useSelector(myState=>myState.countShopping.count);
  let disPatch = useDispatch();
//    const AddCnt=()=>{
//       setCnt(cnt+1);
//    }
//    const removeCnt=()=>{
//     if(cnt>0)
//     setCnt(cnt-1);
//  }
    return ( 
  <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button onClick={()=>{ {disPatch(addCount(cnt))}}}> <AddIcon/></Button>
        {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
       למחוק   
        </Button> */}
        <Button>{cnt}</Button>
        <Button onClick={()=>{{disPatch(removeCount(cnt))}}}> <RemoveIcon/></Button>

      </ButtonGroup>
      
    </Box> 

     );
}
 
export default ButtonDelete;