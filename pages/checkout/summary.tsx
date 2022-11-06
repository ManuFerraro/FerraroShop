import { CartList } from "../../components/cart/CartList";
import { OrdenSummary } from "../../components/cart/OrdenSummary";
import { CartLayout } from "../../components/layouts/CartLayout";
import styles from '../../styles/checkout/CheckoutSumarry.module.css';
import { Chip, Divider } from '@mui/material';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from "../../context/cart";
import { countries } from "../../utils/countries";
import { useRouter } from "next/router";


const SummaryPage = () => {

    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
    
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const onCreateOrder = async() => {
        setIsPosting(true);
       const { hasError, message } = await createOrder();

       if( hasError ) {
        setIsPosting(false);
        setErrorMessage( message );
        return;
       }
       router.replace(`/orders/${ message }`);
    }


    if ( !shippingAddress ) {
      return <></>
    }

    const {firstName, lastName, address, address2 = '', city, zip, country, phone} = shippingAddress;

  return (
    <div>
       <CartLayout>
            <div className={styles.summaryFullContainer}>

              <div className={styles.summaryProgressContainer}>
               <div className={styles.topSummaryProcessTitles}>
                     <ul>
                        <li className={styles.titleLixxx} >Cart</li>
                        <li className={styles.titleLix}>Checkout</li>
                        <li className={styles.titleLixx}>Confirmation</li>
                     </ul>
                 </div>
                <div className={styles.topSummaryProcessIcon}>
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
           
            <div className={styles.summaryBodyContainer}>
                   
                    <div className={styles.summaryColumnI}>
                    
                         <div className={styles.ferraroCartContainer}>
                                     <div className={styles.ferraroCart__title}>
                                              <span className={styles.spanx}></span>
                                              <span className={styles.spanxx}>Resumen de la orden :</span>
                                              <NextLink href='/cart' passHref>
                                              <span className={styles.spanxxx}>Editar</span>
                                              </NextLink>
                                     </div>
                                     <div className={styles.ferraroCart__list}>
                                             <CartList />
                                     </div>
                                     <Divider sx={{ width: '80%', margin:'0px auto', mt: 5}}/>
                                     <div className={styles.ferraroCart__summary}>
                                              <OrdenSummary />
                                     </div>
                                     <div className={styles.ferraroCart__checkout}>
                                            <button
                                            onClick={ onCreateOrder }
                                            disabled={ isPosting }
                                            >Confirmar Orden</button>
                                     </div>
                                     <Chip 
                                       color='error'
                                       label={ errorMessage }
                                       sx={{ display: errorMessage ? 'flex' : 'none', width:'200px', marginLeft: '180px', mt: 2}}
                                     />
                         </div>
                  
                    </div>

                    <div className={styles.summaryColumnII}>
                             <div className={styles.orderBoxContainer}>
                                   <div className={styles.title__column}>
                                      <span>Resumen ({numberOfItems} { numberOfItems === 1 ? 'Producto' : 'Productos' })</span>
                                   </div>
                                   <Divider />
                                   <div className={styles.direccion__column}>
                                        <div className={styles.direccion_title}>
                                            <span className={styles.deliveryx}>Delivery address</span>
                                            <NextLink href='/checkout/address' passHref>
                                            <span className={styles.deliveryxx}>Editar</span>
                                            </NextLink>
                                        </div>
                                        <div className={styles.datos_summary}>
                                            <span>{firstName} {lastName}</span>
                                            <span>{address}{address2 ? `, ${address2}` : '' }</span>
                                            <span>{city} {zip}</span>
                                            <span>{countries.find(c => c.code === country)?.name}</span>
                                            <span>{phone}</span>
                                        </div>
                                   </div>
                                   <Divider />
                                 
                             </div>
                    </div>


            </div>


            </div>

       </CartLayout>

    </div>
  )
}

export default SummaryPage;