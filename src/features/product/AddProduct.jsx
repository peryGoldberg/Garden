import { addProduct } from './ProductApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'


import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './AddProduct.css';


let productSchema = yup.object().shape({
    productName: yup.string("יכול להיות רק מחרוזת").required(" זהו שדה חובה"),
    imgUrl: yup.string().required("זהו שדה חובה"),
    price: yup.number("יכול להיות רק מספר").required("מחיר הוא שדה חובה").min(1, "חייב להיות מינימום 1")
});


const AddProduct = () => {

    const { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all",
        resolver: yupResolver(productSchema)
    });

    let navigate = useNavigate();
    let user = useSelector(us => us.currentUser.currentUser);
    console.log(user)

    const onSubmit = async (details) => {
        console.log(details);
        try {
            let res = await addProduct(details, user.token)
            Swal.fire({
                icon: "success",
                title: "המוצר נוסף בהצלחה ",
                showConfirmButton: false

            })
            navigate('/list')
            console.log(res);
            reset();
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה בהוספת המוצר",
                showConfirmButton: false,
                text: err.message,

            })
        }
    };

    return (
        <div class="background-image">
    <div  className="add-product">
        <form onSubmit={handleSubmit(onSubmit)} style={{  direction: "rtl" }} >
            <div id="productName">
                <TextField htmlFor="productName" id="outlined-basic" label="שם העציץ*"  variant="outlined" color='secondary'
                    type="text" style={{margin:'1%', width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("productName")}
                />
                {errors.productName && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.productName.message}</Alert>}
            </div>
            <div id="description">
                <TextField htmlFor="description"  id="outlined-basic" multiline rows={3} label="תאור" color='secondary'

                    variant="outlined"
                    type="text" style={{margin:'1%',width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("description")}
                />
                {errors.description && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.description.message}</Alert>}
            </div>

            <div  id="price">
                <TextField htmlFor="price" id="outlined-basic" label="מחיר*" color='secondary'
                    variant="outlined"
                    type="number" style={{margin:'1%', width: '30%' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                  
                    {...register("price")}
                />
                {errors.price && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.price.message}</Alert>}
            </div>

            <div id="imgUrl">
                <TextField htmlFor="imgUrl" id="outlined-basic" label="קישור לתמונה*" color='secondary'

                    variant="outlined"
                    type="text" style={{margin:'1%', width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("imgUrl")}
                />
                {errors.imgUrl && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.imgUrl.message}</Alert>}
            </div>


            <Button style={{margin:'1%',}} variant="contained" type="submit">הוסף את המוצר</Button>
        </form>
        </div>
        </div>
    );
};

export default AddProduct;