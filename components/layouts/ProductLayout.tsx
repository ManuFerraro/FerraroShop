import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';
import { NavbarTop } from '../ui/navbar/NavbarTop';
import { SideMenu } from '../ui/navbar/SideMenu';
import { Logged } from "../auth/Logged";
import { Login } from "../auth/Login";

interface Props{
    children: React.ReactNode;
}


export const ProductLayout: FC<Props>= ({children}) => {
  return (
    <>
    <Head>
      <title>Ferraros</title>

      <meta name="description" content="Página web Ferraro" />
    </Head>

     <nav >
      <NavbarTop />
      <Navbar />
     </nav>
     
      <SideMenu />
      <Login />
      <Logged />
      <main className='productLayoutBody' >
         { children }
      </main>

  </>
  )
}
