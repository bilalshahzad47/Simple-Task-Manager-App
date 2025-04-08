import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  userToken: null,
  profileDetails : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      console.log("payload",payload)
      state.userData = payload.user
      state.userToken = payload.token
    },
    updateUserData: (state, { payload }) => {
      state.userData = payload.user.user
    },
    removeUser: (state) => {
      state.userData = {};
      state.userToken = null;
      localStorage.clear();
    },
    addData: (state, { payload }) => {
      state[payload.name] = payload.value
    },
    addProfileDetails : (state, { payload }) =>{
      state.profileDetails = payload.details
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, updateUserData, addData , addProfileDetails  } = userSlice.actions

export default userSlice.reducer