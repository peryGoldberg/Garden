import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser:null
}

const userSlice = createSlice({
    name: "currentUser",
    initialState: initialState,
    reducers: {
      userIn(state,action) {
        state.currentUser=action.payload;
        localStorage.setItem("myUser", JSON.stringify(state.currentUser));
      } ,
      userOut(state,action){
        state.currentUser = null;
      localStorage.removeItem("myUser");
      }
    }

})

export const { userIn,userOut } = userSlice.actions;
export default userSlice.reducer;