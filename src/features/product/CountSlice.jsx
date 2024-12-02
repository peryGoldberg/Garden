import { createSlice } from '@reduxjs/toolkit';

const initialState = {
count: 0
 
}

const countSlice = createSlice({
    name: "countShopping",
    initialState: initialState,
    reducers: {
        addCount: (state,action) => {
            state.count = state.count+action.payload;
            
          },
          removeCount: (state,action) =>{
            state.count = action.payload;
            
          },
        changeCount:(state,action)  =>{
          state.count = action.payload;
        }
     
    }
})

export const {addCount ,removeCount  ,changeCount } = countSlice.actions; 
export default countSlice.reducer;