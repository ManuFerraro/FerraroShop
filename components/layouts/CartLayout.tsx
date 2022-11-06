import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';
import { NavbarTop } from '../ui/navbar/NavbarTop';
import { SideMenu } from '../ui/navbar/SideMenu';
import { NavbarCart } from '../ui/navbar/NavbarCart';
import { Login } from "../auth/Login";


interface Props{
    children: React.ReactNode;
}


export const CartLayout: FC<Props>= ({children}) => {
  return (
    <>
    <Head>
      <title>Ferraros</title>

      <meta name="description" content="Página web Ferraro" />
    </Head>

     <nav >
      
       <NavbarCart />
     </nav>
     <Login />
      
      <main className='cartLayoutBody' >
         { children }
      </main>

  </>
  )
}