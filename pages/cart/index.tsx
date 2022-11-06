import styles from '../../styles/cart/CartPage.module.css';
import { CartLayout } from '../../components/layouts/CartLayout';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';
import { GrDeliver } from 'react-icons/gr';
import { FaExchangeAlt } from 'react-icons/fa';
import { GrSecure } from 'react-icons/gr';
import {SiAmericanexpress } from 'react-icons/si';
import { SiVisa } from 'react-icons/si';
import { FaCcMastercard } from 'react-icons/fa';
import { FaCcDiscover } from 'react-icons/fa';
import { FaCcDinersClub } from 'react-icons/fa';
import { SiApplepay } from 'react-icons/si';
import { BsPaypal } from 'react-icons/bs';
import { FaCcJcb } from 'react-icons/fa';
import { SiFampay} from 'react-icons/si';
import { Divider } from '@mui/material';
import { CartList } from '../../components/cart/CartList';
import { OrdenSummary } from '../../components/cart/OrdenSummary';
import NextLink from 'next/link';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUi, toggleAccount, toggleMenu, toggleUser } from '../../store/features/toggleMenuSlice';
import { NextPage } from 'next';

interface Props{
    isValidToken: boolean;
}


const CartPage: NextPage<Props>= ({isValidToken}) => {

   const { isLoaded, cart} = useContext(CartContext);
   const router = useRouter();
   const dispatch = useAppDispatch()
   const { toggleAccount: toggleAccountChange } = useAppSelector(selectUi);
   
   
 

   useEffect(() => {
     if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
     }
   }, [isLoaded, cart, router])
   
  if( !isLoaded || cart.length === 0) {
     return(<></>);
  }

  return (
    
       <CartLayout>
          <div className={styles.cartFullContainer}>
                 

                 <div className={styles.topCartProcessContainer}>
                 <div className={styles.topCartProcessTitles}>
                     <ul>
                        <li className={styles.titleLixxx} >Cart</li>
                        <li className={styles.titleLix}>Checkout</li>
                        <li className={styles.titleLixx}>Confirmation</li>
                     </ul>
                 </div>
                <div className={styles.topCartProcessIcon}>
                        <ul>
                            <li className={styles.lineStepActive}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStep}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStep}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStepFinal}></li>
                        </ul>
                  </div>
                           
                 </div>
           
           <div className={styles.cartBodyContainer}>
                  <div className={styles.cartColumnI}>
                         <div className={styles.ferraroCartContainer}>
                                     <div className={styles.ferraroCart__title}>
                                              <span>Products:</span>
                                     </div>
                                     <div className={styles.ferraroCart__list}>
                                             <CartList editable />
                                     </div> 
                                     <Divider sx={{ width: '80%', margin:'0px auto', mt: 5}}/>
                                     <div className={styles.ferraroCart__summary}>
                                              <OrdenSummary />
                                     </div>
                                     
                                       {
                                        (isValidToken)
                                        ? (
                                             
                                            <NextLink href='/checkout/address' passHref> 
                                            <div className={styles.ferraroCart__checkout}
                    
                                            >
                                                   <button>CheckOut</button>
                                            </div>
                                            </NextLink>
                                        ) : (
                                           
                                            <div className={styles.ferraroCart__checkout}>          
                                            
                                                   <button
                                                    onClick={() => dispatch(toggleAccount(!toggleAccountChange))}
                                                   >CheckOut</button>
                                            </div>
                                           
                                        )
                                       }
                                            
                                        
                                       
                                            
                                            
                                        
                                     
                                        
                         </div>
                  </div>
                  <div className={styles.cartColumnII}>
                            <div className={styles.organgeBoxContainer}>
                                 <div className={styles.orangeBox_title}>
                                    <span>THE ORANGE BOX</span>
                                 </div>
                                 <Divider sx={{width: '95%'}}/>
                                 <div className={styles.orangeBox__img}>
                                        <Image
                                          src={require('../../public/orange-boxx.png')}
                                          alt='Orange Box'
                                          width={80}
                                          height={80}
                                          
                                        />
                                        <span>All orders are delivered in an orange box tied with a Bolduc ribbon, with the exception of certain items</span>
                                 </div>
                                 <div className={styles.orangeBox__service}>
                                          <div className={styles.orangeBox__titleService}>
                                             <span>CUSTOMER SERVICE</span>
                                          </div>
                                          <Divider />
                                          <div className={styles.orangeBox__phone}>
                                                    <div className={styles.orangeBox__phoneNumber}>
                                                        <FiPhone className={styles.phoneIcon} />
                                                        <span>0800-333-4683</span>
                                                    </div> 
                                                    <span className={styles.orangePhoneSpan}>Monday to Friday: 9am - 6pm EST</span>
                                                    <span className={styles.orangePhoneSpan}>Saturday: 10am - 6pm EST</span>                         
                                          </div>
                                 </div>
                                 <div className={styles.orangeBox__delivery}>
                                            <div>
                                                <GrDeliver className={styles.delivery_icon} />
                                                <span>Free standard delivery</span>
                                            </div>
                                            <div>
                                                <FaExchangeAlt className={styles.delivery_icon} />
                                                <span>Returns & exchanges</span>
                                            </div>
                                            <div>
                                                <GrSecure className={styles.delivery_icon} />
                                                <span>Shop securely</span>
                                            </div>
                                 </div>
                                 <div className={styles.orangeBox__creditCard}>
                                    <div className={styles.organgeCreditI}>
                                            <SiAmericanexpress />
                                            <SiVisa />
                                            <FaCcMastercard />
                                            <FaCcDiscover />
                                            <FaCcDinersClub />
                                            <FaCcJcb />
                                            
                                    </div>
                                    <div className={styles.organgeCreditII}>
                                             <SiApplepay />
                                             <BsPaypal />
                                             <SiFampay />
                                    </div>
                                 </div>
                                    
                            </div>
                  </div>
           </div>


        </div>

       </CartLayout>
  )
}

import { GetServerSideProps } from 'next';
import { jwt } from '../../utils';







export const getServerSideProps: GetServerSideProps = async ({req}) => {
      
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    return {
        props: {
            isValidToken,
        }
    }
}


export default CartPage;