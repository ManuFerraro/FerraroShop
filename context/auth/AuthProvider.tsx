import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, useReducer, useEffect } from 'react';
import { ferraroApi } from '../../api';
import { IUser } from '../../interfaces/user';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { useRouter } from 'next/router';


interface Props{
    children: React.ReactNode;
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
     isLoggedIn: false,
     user: undefined,
}


export const AuthProvider:FC<Props> = ({ children }) => {

   const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
   const router = useRouter();

    useEffect(() => {
        checkToken();
    }, [])
    
   const checkToken = async() => {

        if(!Cookies.get('token')) {
          return;
        }

    try {
      const { data } = await ferraroApi.get('/user/validate-token');
      const {token, user} = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user});
      return true;
    } catch (error) {
       Cookies.remove('token');
    }

   }



   const loginUser = async(email: string, password: string): Promise<boolean> => {
      try {
        const { data } = await ferraroApi.post('/user/login', {email, password});
        // console.log({data});
        const {token, user} = data;
        // Cookies.set('user', JSON.stringify(user));      //CAMBIAR ESTO
        Cookies.set('token', token);
        dispatch({ type: '[Auth] - Login', payload: user});
        return true;
      } catch (error) {
        return false;
      }
   }


   const registerUser = async(name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
            try {
        const { data } = await ferraroApi.post('/user/register', {name,email, password});
        const {token, user} = data;
        Cookies.set('token', token);
        dispatch({ type: '[Auth] - Login', payload: user});
        return{
          hasError: false
        }
            } catch (error) {
                if( axios.isAxiosError(error)) {
                  return {
                    hasError: true,
                    message: error.response?.data.message
                  }
                }

                return{
                  hasError: true,
                  message: 'No se pudo crear el usuario - Intente nuevamente'
                }
            }
   }

   const logout = () => {
     Cookies.remove('token');
     Cookies.remove('cart');
     Cookies.remove('firstName');
     Cookies.remove('lastName');
     Cookies.remove('address');
     Cookies.remove('address2');
     Cookies.remove('zip');
     Cookies.remove('city');
     Cookies.remove('country');
     Cookies.remove('phone');
     router.reload();
   }

   return (

    <AuthContext.Provider value={{
         ...state,

         //Methods
         loginUser,
         registerUser,
         logout,
    }}>
            { children }
       </AuthContext.Provider >
   )
}