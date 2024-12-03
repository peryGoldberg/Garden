import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import { getAllProduct, getNumOfAllPages } from './ProductApi';
import { Link, Outlet } from "react-router-dom";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import "./ProductList.css";
import { Button } from '@mui/base';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const ProductList = () => {
    const [remove, setRemove] = useState(false);
   

    const [age, setAge] = React.useState('');

    const handleChangeSort = (event) => {
        setAge(event.target.value);
    };
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(12);
    const [products, setProducts] = useState([]);
    let [cnt, setCnt] = useState(1);
    useEffect(() => {
        async function fetchData() {
            const pageCount = await getNumOfAllPages();
            setCount(pageCount);
            setCnt(pageCount.data.numPages);
        }
        fetchData();
    }, [page, search,remove]);

    useEffect(() => {
        async function addSomeBags() {
            try {
                let res = await getAllProduct(page, 12, search);
                setProducts(res.data);
                console.log(products)
            } catch (err) {
                console.log(err)
            }
        }

        addSomeBags();

    }, [page, count]);


    const handleChange = (event, value) => {

        setPage(value);
    };

    // Sort the array by sum
    let changeHeight = (e) => {
        const sortedList = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedList);
    };

    // Sort the array by old
    let changeSmall = (e) => {
        const sortedList = [...products].sort(
            (b, a) => b.price - a.price
        );
        setProducts(sortedList);
    };

    // Sort the array by new
    let changeNew = (e) => {
        const sortedList = [...products].sort((a, b) => new Date(b.productionDate) - new Date(a.productionDate));

        setProducts(sortedList);
    };

    return (
        <div style={{ padding: '10% 5%', backgroundColor: 'rgba(243, 240, 240, 0.9)' }}>
            <div style={{ display: 'flex',gap:'3%',textAlign:'center' }}>
                <div>
                    <Stack spacing={2} color="secondary">
                        <Pagination count={cnt} page={page} onChange={handleChange} />
                    </Stack>
                </div>
               
              
                  <Box sx={{ minWidth: 120 ,textAlign:'center'}}>
                <FormControl fullWidth>
                    <InputLabel color="secondary" id="demo-simple-select-label">מיין לפי</InputLabel>
                    <Select color="secondary"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="מיין לפי"
                        onChange={handleChangeSort}
                    >
                        <MenuItem onClick={changeNew} value={10}>חדש</MenuItem>
                        <MenuItem onClick={changeSmall} value={20}>מהנמוך ביותר</MenuItem>
                        <MenuItem onClick={changeHeight} value={30}>מהגבוה לנמוך</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            </div>
          
            <ul className='listProduct' style={{ direction: 'rtl' }}>

                {products.map(item => <li className='li' key={item._id}>
                    <Link sx={{  textDcorationLine: 'none'}} to={"" + item._id} state={item}>
                        <ProductItem one={item} setRemove={setRemove} remove={remove}/>
                    </Link>
                </li>)}
            </ul>

            <Outlet />
        </div>
    );
}

export default ProductList;