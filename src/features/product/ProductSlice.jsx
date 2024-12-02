import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shoppingProduct: [],
    selectedProduct: null,
    selectedProductForEdit: null
}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        addShoppingProduct: (state, action) => {
            let flag=true;
             state.shoppingProduct.forEach(product => {
                 if(product._id === action.payload._id){
                    flag=false;
                    product.cnt+=action.payload.cnt;
                 }
             })
             if (flag==true) {
                 state.shoppingProduct = [...state.shoppingProduct, action.payload];
            console.log(JSON.stringify(action.payload));
             }
           else{

            saveProduct(state,action);
           }
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        selectProductForEdit: (state, action) => {
            state.selectedProductForEdit = action.payload
        },
        deleteProduct: (state, action) => {
            state.shoppingProduct = state.shoppingProduct.filter(item => item._id !== action.payload._id);
        },
        saveProduct: (state, action) => {
            state.selectedProductForEdit = null;
            state.shoppingProduct = state.shoppingProduct.map(item => {
                if (item._id !== action.payload._id)
                    return item;
                return action.payload;
            })
        }
        
        
        // addCountProduct: (state,action) => {
        //     // state.shoppingProduct = state.shoppingProduct.map(item => item.id !== action.payload);
        //     // state.shoppingProduct.count =  state.shoppingProduct.count+1;
        //     for (let i = 0; i < state.shoppingProduct.length; i++) {
        //       if(state.shoppingProduct[i]._id === action.payload._id)
        //       state.shoppingProduct[i]=action.payload;
        //     }
        // }
    //     addCountProduct: (state, action) => {
                       
    //             state.shoppingProduct= state.shoppingProduct.map(item => {
    //                 if (item._id === action.payload._id) {
    //                     return {
    //                         ...item,
    //                         count: (item.count + 1)
    //                     };
    //                 }
    //                 return item;
    //             })
    //         }
    //     ,
    // removeCountProduct: (state, action) => {
    //     return {
    //         ...state,
    //         shoppingProduct: state.shoppingProduct.map(item => {
    //             if (item._id === action.payload._id && item.count > 0) {
    //                 return {
    //                     ...item,
    //                     count: item.count - 1
    //                 };
    //             }
    //             return item;
    //         })
    //     };
    // }

}
})

export const { addShoppingProduct, selectProduct, selectProductForEdit, deleteProduct, saveProduct, addCountProduct, removeCountProduct } = productSlice.actions;
export default productSlice.reducer;