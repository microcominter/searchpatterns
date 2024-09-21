import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'authdata',
  initialState: {
    authData: null,
    isAuthenticated:false
  },
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    }
  })
export const {
  setAuthData,
  
} = slice.actions;

export default slice.reducer;
