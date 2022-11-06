import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
import { RootState } from '../store';

  
  export type UiState = {
    toggleAccount: boolean;
  };
  
  const initialState: UiState = {
    toggleAccount: false
  };
  
  export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      toggleAccount: (state, action: PayloadAction<boolean>)=> {
        state.toggleAccount = action.payload;
      },
    },
  });

  export const {
    toggleAccount
  } = uiSlice.actions;
  
 
  export const selectUi = (state: RootState) => state.ui;
  

  export default uiSlice.reducer;