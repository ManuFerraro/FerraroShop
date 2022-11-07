import { BiUserCircle } from 'react-icons/bi';
import { TbTicket } from 'react-icons/tb';
import { BsFillKeyFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { RiUserSearchLine } from 'react-icons/ri';
import styles from '../../styles/auth/Logged.module.css';
import { Divider, IconButton, Input, InputAdornment } from '@mui/material';
import { SearchOutlined, DashboardOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUi, toggleUser } from '../../store/features/toggleMenuSlice';
import NextLink from 'next/link';
import { Logo } from '../../assets/images';



export const Logged = () => {
     
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const onSearchTerm = () => {
     if( searchTerm.trim().length === 0 ) return;
       router.push(`/search/${ searchTerm }`)
    }

    const { user, isLoggedIn, logout} = useContext(AuthContext)

    const dispatch = useAppDispatch()
    const { toggleUser: toggleSideUser} = useAppSelector(selectUi);

    const onLogout = () => {
         logout();
         dispatch(toggleUser(!toggleSideUser)) 
    }

  return (
      <>
       {

       

       <div className={ toggleSideUser ? styles.loggedBlurContainer : ''}>
           <div className={ toggleSideUser ? styles.loggedContainer : styles.container}>
            <div className={styles.closeAdminPanel} onClick={ () =>dispatch(toggleUser(!toggleSideUser)) }>X</div>
                <div className={styles.loggedMenu}>
                       <div className={styles.loggedForm}>
                       <Input
                        type='text'
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ () => onSearchTerm()}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                       </div>
                    <div className={styles.loggedPerfilContiner}>
                     {

                        isLoggedIn && (
                         <>
                           <div className={styles.loggedPerfil}>
                                <BiUserCircle className={styles.loggedPerfilIcon}  />
                                <span>Perfil</span>
                           </div>
                        <NextLink href='/orders/history'>
                           <div className={styles.loggedOrders}>
                              <TbTicket className={styles.loggedOrdersIcon} />
                              <span>Mis ordenes</span>
                          </div>
                        </NextLink>
                         </>
                        )
                             
                     }
                     {
                        isLoggedIn 
                        ? (
                           <div className={styles.loggedExit} onClick={ () => onLogout()}>
                              <IoMdExit className={styles.loggedExitIcon} />
                              <span>Salir</span>
                           </div>
                        )
                        : (
                           
                           <div className={styles.loggedKey}>
                              <BsFillKeyFill className={styles.loggedKeyIcon} />
                              <span>Ingresar</span>
                          </div>
                        )
                     }
                      
                    </div>
                       <Divider />  
                        <div className={styles.adminContainer}>
                         {
                           user?.role === 'admin' && (
                              <>
                                 <div className={styles.admin_panel}>
                                    <span>Admin Panel</span>
                                 </div>
                                 <NextLink href='/admin' passHref>
                                 <div className={styles.loggedProduct}>
                                     <DashboardOutlined className={styles.loggedProductIcon} />
                                     <span>Dashboard</span>
                                 </div>
                                 </NextLink>
                                 <NextLink href='/admin/products' passHref>
                                 <div className={styles.loggedProduct}>
                                     <MdProductionQuantityLimits className={styles.loggedProductIcon} />
                                     <span>Productos</span>
                                 </div>
                                 </NextLink>
                                 <NextLink href='/admin/orders' passHref>
                                 <div className={styles.loggedOrdenes}>
                                     <TbTicket className={styles.loggedOrdenesIcon} />
                                    <span>Ordenes</span>
                                 </div>
                                 </NextLink>
                                <NextLink href='/admin/users' passHref>
                                 <div className={styles.loggedUser}>
                                    <RiUserSearchLine className={styles.loggedUserIcon} />
                                    <span>Usuarios</span>
                                 </div>
                                </NextLink>
                              
                              </>
                           )
                         }    
                             

                             <div className={styles.loggedImage}>
                             <Image className={styles.logoMenu} src={Logo}
                                    alt='FERRARO'
                                    width={88}
                                    height={55}
                                    
                                    />
                             </div>
                        
                        </div>       
                </div>
                
           </div>
       </div>
      }

     </>
  )
}
