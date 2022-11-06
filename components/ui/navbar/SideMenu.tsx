
import { useState, useContext, useEffect } from 'react';
import { selectUi, toggleMenu } from '../../../store/features/toggleMenuSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styles from '../../../styles/navbar/SideMenu.module.css'


import { BiUser } from 'react-icons/bi';
import { HiOutlineChat } from 'react-icons/hi';
import  NextLink from 'next/link';
import { MdAdd } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/Ci';


export const SideMenu = () => {
const dispatch = useAppDispatch()
const { toggleMenu: toggleSide } = useAppSelector(selectUi);

  useEffect(() => {
      toggleSide ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
  }, [toggleSide])


  
  

  return ( 
      <>
    
 
    {

      
      <div className={ toggleSide ? styles.sideMenuContainerBlur : ''}>
      <div className={toggleSide ? styles.sideMenuContainer : styles.container}>
          <div className={styles.sideMenu}>
               <div className={styles.sideTitle}>
                <div className={styles.sideTitle__item}>
                  <AiOutlineClose className={styles.sideTitle__icon} onClick={ () =>dispatch(toggleMenu(!toggleSide)) }/>
                   <span>MENU</span>
                </div>
               </div>
               <div className={styles.sideListContainer}>
                   <ul className={styles.sideList}>
                     <NextLink href='/category/women' passHref>
                       <li className={styles.list__item} onClick={ () => dispatch(toggleMenu(!toggleSide)) }>
                           <div className={styles.list__button}>
                               <span>WOMEN</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                     </NextLink>
                     <NextLink href='/category/men' passHref>
                     <li className={styles.list__item} onClick={ () => dispatch(toggleMenu(!toggleSide)) }>
                           <div className={styles.list__button}>
                               <span>MEN</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                       </NextLink>
                       <NextLink href='/' passHref>
                       
                       <li className={styles.list__item}>
                           <div className={styles.list__button}>
                               <span>HOME, OUTDOOR AND EQUESTRIAN</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                       
                       </NextLink>

                       <NextLink href='/' passHref>
                       <li className={styles.list__item}>
                           <div className={styles.list__button}>
                               <span>JEWELRY AND WATCHES</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                       </NextLink>

                       <li className={styles.list__item}>
                           <div className={styles.list__button}>
                               <span>FRAGANCES AND MAKE-UP</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>

                       <li className={styles.list__item}>
                           <div className={styles.list__button}>
                               <span>GIFTS AND PETIT H</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                       <li className={styles.list__item}>
                           <div className={styles.list__button}>
                               <span>SPECIAL EDITION AND SERVICES</span>
                               <MdAdd className={styles.sideList__icon}/>
                           </div>
                       </li>
                       <li className={styles.list__item}>
                           <div className={styles.list_itemSpace}>
                           <div className={styles.list__button}>
                               <span>ABOUT HERMES</span>
                               <MdAdd />
                           </div>
                           </div>
                       </li>
                   </ul>
               </div>
               <div className={styles.wrapWhite}>
                 
               </div>
               <div className={styles.sideAboutContainer}>
                  <div className={styles.about__item}>
                      <CiLocationOn />
                      <span>Find a store</span>
                  </div>
                  <div className={styles.about__item}> 
                   <BiUser />
                   <span>Account</span>
                  </div>
                  <div className={styles.about__item}>
                   <HiOutlineChat />
                   <span>Contact Us</span>
                  </div>
               </div>
          </div>
      </div>
   </div> 
    

     }
       
      </>
       
  )
}

