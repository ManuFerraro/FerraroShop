import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
import { RootState } from '../store';

  
  export type UiState = {
    toggleMenu: boolean;
    toggleAccount: boolean;
    toggleUser: boolean;
  };
  
  const initialState: UiState = {
    toggleMenu: false,
    toggleAccount: false,
    toggleUser: false,
  };
  
  export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      toggleMenu: (state, action: PayloadAction<boolean>)=> {
        state.toggleMenu = action.payload;
      },
      toggleAccount: (state, action: PayloadAction<boolean>)=> {
        state.toggleAccount= action.payload;
      },
      toggleUser: (state, action: PayloadAction<boolean>)=> {
        state.toggleUser= action.payload;
      },
     
    },
  });

  export const {
    toggleMenu,
    toggleAccount,
    toggleUser
  } = uiSlice.actions;
  
 
  export const selectUi = (state: RootState) => state.ui;
  

  export default uiSlice.reducer;