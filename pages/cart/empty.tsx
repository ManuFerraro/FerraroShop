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
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { Divider } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import OrangeBox from '../../assets/images/orange-boxx.png'

const EmptyPage = () => {


   const router = useRouter();
   const destination = router.query.p?.toString() || '/';

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
                                     <div className={styles.ferraroCart__titleEmpty}>
                                        <div className={styles.icon_empty}>
                                              <MdOutlineRemoveShoppingCart />                                       
                                        </div>
                                        <div className={styles.desc_empty}>
                                        <span>Su carrito está vacío</span>
                                       <NextLink href={destination} passHref>
                                        <button>Regresar</button>
                                        </NextLink>  
                                        </div>
                                     </div>
                                     
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
                                          src={OrangeBox}
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

export default EmptyPage;