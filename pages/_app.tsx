import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline} from '@mui/material';
import { lightTheme } from '../themes/lightTheme';
import { store } from '../store/store';
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from '../context/auth/AuthProvider';
import { CartProvider } from '../context/cart';


function MyApp({ Component, pageProps }: AppProps) {
  return (
   <PayPalScriptProvider options={{'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}}>
    <SWRConfig
    value={{
      refreshInterval: 500,
      fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
    }}
  >
    <Provider store={store}>
     <AuthProvider>
      <CartProvider>
      <ThemeProvider theme={lightTheme}>
      <NextUIProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </NextUIProvider>
      </ThemeProvider>
      </CartProvider>
      </AuthProvider>
      </Provider>
      </SWRConfig>
      </PayPalScriptProvider>
   )
    
}

export default MyApp
