import Head from "next/head";
import { FC } from "react";
import { Logged } from "../auth/Logged";
import { Login } from "../auth/Login";
import { Footer } from "../ui/Footer";
import { Navbar } from "../ui/navbar/Navbar";
import { NavbarTop } from "../ui/navbar/NavbarTop";
import { SideMenu } from "../ui/navbar/SideMenu";




interface Props{
    children: React.ReactNode;
}



export const ShopLayout:FC<Props> = ({children}) => {
  return (
    <>
      <Head>
        <title>Ferraro</title>

        <meta name="description" content="Página web Ferraro" />
      </Head>

       <nav >
        <NavbarTop />
        <Navbar />
       </nav>
       
        <SideMenu />

      
        <Login />
        <Logged />
      <main className='mainGlobalContainer' style={{
       
      }}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
