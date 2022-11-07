
import { BsHandbag } from 'react-icons/bs';
import { BiUser} from 'react-icons/bi';
import { MdClose} from 'react-icons/md';
import { Box, Input, Badge } from '@mui/material';

import styles from '../../../styles/navbar/Navbar.module.css';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUi, toggleAccount, toggleMenu, toggleUser } from '../../../store/features/toggleMenuSlice';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from '../../../context/cart';
import { AuthContext } from '../../../context/auth';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineMenu } from 'react-icons/ai';



export const Navbar = () => {
  const dispatch = useAppDispatch()
  const { toggleMenu: toggleMenuChange, toggleAccount: toggleAccountChange, toggleUser: toggleUserChange } = useAppSelector(selectUi);
  const [searchOn, setSearchOn] = useState(false);
  const {numberOfItems, isLoaded} = useContext(CartContext)
  const { isLoggedIn, user } = useContext(AuthContext)
 
  //BÚSQUEDA
   const router = useRouter();
   const [searchTerm, setSearchTerm] = useState('')
   

   const onSearchTerm = () => {
     if( searchTerm.trim().length === 0 ) return;
     navigateTo(`/search/${ searchTerm }`);
   }
   
  const navigateTo = (url: string ) => {
    router.push(url);
  }


  const searchAction = () => {
     setSearchOn(true)
  }

  const handleFocus = () => {
      setSearchOn(true)
  }

  const handleBlur = () => {
    setSearchOn(false)
  }



  return (
    <div className={styles.navContainer}>
      <div className={styles.navColI}>
        <div className={styles.navMenuContainer}>
         <button onClick={() => dispatch(toggleMenu(!toggleMenuChange))} className={styles.navMenuButton}>
           <AiOutlineMenu />
         </button>
         <span className={styles.navMenuSpan}> Menu</span>
         </div>
         <div className={styles.navSearchContainer}>
            <CiSearch className={styles.iconSearch} onClick={ () => onSearchTerm() }/>
            <input type='search' placeholder='Search' onFocus={handleFocus} onBlur={handleBlur} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value) } onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null} />
            {searchOn && <div className={styles.navClose} onClick={() => setSearchOn(false)} ><MdClose /></div>}
         </div>
         <Box className={styles.navSearchR}>
             <CiSearch /> 
         </Box>
      </div>
      
      {!searchOn && <div className={styles.navColII}>
        <NextLink href='/' passHref>
          <Image className={styles.logoMenu} src={require('../../../public/logoFERRAROF.svg')}
          alt='FERRARO'
          width={95}
          height={60}
          
          />
        </NextLink>
      </div>}
      
      <NextLink href='/' passHref>
      <div className={styles.navColIIR}>
         
           <Image className={styles.logoMenuResponsive}  src={require('../../../public/hermes-logo-small.svg')}
          alt='FERRARO'
          width={50}
          height={30}
          />
      </div>
      </NextLink>
     
      <div className={styles.navColIII}>
       {
         isLoggedIn 
         ? (
          <div className={styles.navUser} onClick={() => dispatch(toggleUser(!toggleUserChange))}>
              <BiUser className={styles.navUserIcon} />
              <span>{user?.name}</span>
          </div>

         )
         : (
          <div className={styles.navUser} onClick={() => dispatch(toggleAccount(!toggleAccountChange))}>
                <BiUser className={styles.navUserIcon} />
                <span>Account</span>
          </div>

         )
       }
        

         <NextLink  href={ isLoaded ?  `/cart?p=${router.asPath}` : `/cart/empty?p=${router.asPath}` } passHref>
         <div className={styles.navCart}>
            <Badge className={styles.navCartBadge} badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color= 'primary'>
               <BsHandbag className={styles.navCartIcon} />
            </Badge>
               <span className={styles.navCartSpan}>Cart</span>
         </div>
         </NextLink>
      </div>
    </div>
  )
}
