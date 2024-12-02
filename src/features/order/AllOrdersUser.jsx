import { useEffect, useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getAllorders } from './OrderApi';
const AllOrdersUser = () => {

    let admin = useSelector(us => us.currentUser.currentUser)?.token;
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        async function addSomeBags() {
            try {
                let res = await getAllorders(admin);
                setProducts(res.data);
                
            } catch (err) {
                console.log(err)
            }
        }
        addSomeBags();

    }, []);

    return ( 
        <div style={{ padding: '7% 3%', backgroundColor: 'rgba(243, 240, 240, 0.9)' }}>
        <ul style={{ direction: 'rtl' }}>
            {products.map(item => <li className='li' key={item._id}>               
           <Typography>{item.userId}</Typography>
           <Typography>{item.dueDate}</Typography>
           <Typography>{item.orderDate}</Typography>
           <Typography>{item.userId}</Typography>
     
           <Typography>{item.address}</Typography>
           <Typography>{item.isSetOff}</Typography>
            </li>)}
        </ul>
    </div>
     );
}
 
export default AllOrdersUser;