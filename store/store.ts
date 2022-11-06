
import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
  import toggleMenu, { toggleAccount } from './features/toggleMenuSlice';
  
  export const store = configureStore({
    reducer: { 
      ui: toggleMenu,
     
      
  } 
    
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;
  export type AppState = ReturnType<typeof store.getState>;