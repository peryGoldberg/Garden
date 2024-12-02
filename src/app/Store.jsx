import { configureStore } from "@reduxjs/toolkit";
import CountSlice from "../features/product/CountSlice";
import ProductSlice from "../features/product/ProductSlice";
import UserSlice from "../features/user/UserSlice";


export const store = configureStore({
    reducer: {
        product: ProductSlice,
    countShopping: CountSlice,
    currentUser:UserSlice
    }
})