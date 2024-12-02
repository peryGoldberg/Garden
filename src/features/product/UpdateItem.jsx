// const UpdateItem = () => {
//     return (  

//         <h1 style={{marginTop:"7%"}}>דף עריכה</h1>
//     );
// }
 
// export default UpdateItem;

import { addProduct ,updateProductById} from './ProductApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './AddProduct.css';


let productSchema = yup.object().shape({
    productName: yup.string("יכול להיות רק מחרוזת").required(" זהו שדה חובה"),
    imgUrl: yup.string().required("זהו שדה חובה"),
    price: yup.number("יכול להיות רק מספר").required("מחיר הוא שדה חובה").min(1, "חייב להיות מינימום 1")
});

// let passangerSchema = yup.object().shape({
//     productName: yup.string("יכול להיות רק מחרוזת").required("שדה חובה"),
//     imgUrl: yup.string().required("שרכון הוא חובה").matches(/^[0-9]{1,}$/, "לא תואם את התבנית רק ספרות"),
//     price: yup.number().min(1, "חייב להוית מינימום 1").max(8, "חייב להיות מקסימום 8")
// });
//, defaultValues: { passport: "0000000" }
const UpdateItem = () => {
    let defaultUpdate=useSelector(de=>de.product.selectedProductForEdit);
    console.log(defaultUpdate)

    const { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all", defaultValues: {imgUrl:defaultUpdate?.imgUrl, price:defaultUpdate?.price, description:defaultUpdate?.description ,productName:defaultUpdate?.productName  },
        resolver: yupResolver(productSchema)
    });

    let navigate = useNavigate();
    let user = useSelector(us => us.currentUser.currentUser);
    console.log(user)
   

    const onSubmit = async (details) => {
        console.log(details);
        try {
            console.log(defaultUpdate._id)
            let res = await updateProductById(defaultUpdate._id, user.token,details)
            Swal.fire({
                icon: "success",
                title: "המוצר התעדכן בהצלחה ",
                showConfirmButton: true

            })
            navigate(-1);
             reset();
            console.log(res);
           
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה בעדכון המוצר",
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
                <TextField htmlFor="productName" id="outlined-basic" label="שם העציץ*"  variant="outlined"
                    type="text" style={{margin:'1%', width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("productName")}
                />
                {errors.productName && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.productName.message}</Alert>}
            </div>
            <div id="description">
                <TextField htmlFor="description"  id="outlined-basic" multiline rows={3} label="תאור"

                    variant="outlined"
                    type="text" style={{margin:'1%',width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("description")}
                />
                {errors.description && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.description.message}</Alert>}
            </div>

            <div  id="price">
                <TextField htmlFor="price" id="outlined-basic" label="מחיר*"

                    variant="outlined"
                    type="number" style={{margin:'1%', width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                  
                    {...register("price")}
                />
                {errors.price && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.price.message}</Alert>}
            </div>

            <div id="imgUrl">
                <TextField htmlFor="imgUrl" id="outlined-basic" label="קישור לתמונה*"

                    variant="outlined"
                    type="text" style={{margin:'1%', width: '30%', borderColor: 'pink' }} InputLabelProps={{ style: { textAlign: 'right' } }}
                   
                    {...register("imgUrl")}
                />
                {errors.imgUrl && <Alert style={{ margin: "0% 35%" }} severity="error">{errors.imgUrl.message}</Alert>}
            </div>


            <Button style={{margin:'1%',}} variant="contained" type="submit">עדכן את המוצר</Button>
        </form>
        </div>
        </div>
    );
};

export default UpdateItem;