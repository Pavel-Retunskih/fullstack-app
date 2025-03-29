import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
  initialState: {
    filter: 'All'
  },
  name: 'AppSlice',
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload
    }
  }
})

export const {changeFilter} = appSlice.actions;