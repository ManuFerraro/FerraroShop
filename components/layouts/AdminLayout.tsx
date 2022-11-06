import Head from "next/head";
import { FC } from "react";
import { Logged } from "../auth/Logged";
import { Login } from "../auth/Login";
import { NavbarTop } from "../ui/navbar/NavbarTop";
import { SideMenu } from "../ui/navbar/SideMenu";
import { Box, Typography } from '@mui/material';
import { Navbar } from "../ui";




interface Props{
    children: React.ReactNode;
    subTitle: string;
    title: string;
    icon?: JSX.Element;
}



export const AdminLayout:FC<Props> = ({children, title, subTitle, icon}) => {
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
       
      }}>
        <Box display='flex' flexDirection='column'>
           <Typography variant='h1' component='h1'>
              { icon }
              { title }
           </Typography>
           <Typography variant='h2' sx={{ mb: 1}}>{ subTitle }</Typography>
        </Box>
        <Box className='fadeIn'>
        {children}
        </Box>
        
        
        
        
        </main>

    </>
  );
};
