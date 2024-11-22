import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token : null ,
  userType:null ,
  name:null,
  userID : null
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.name = action.payload.name;
      state.userID = action.payload.userID
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser } = userSlice.actions;

export default userSlice.reducer;
