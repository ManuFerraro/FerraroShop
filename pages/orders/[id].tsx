import { useState } from "react";
import { CartList } from "../../components/cart/CartList";
import { OrdenSummary } from "../../components/cart/OrdenSummary";
import { CartLayout } from "../../components/layouts/CartLayout";
import styles from '../../styles/orders/OrdersId.module.css';
import { Divider, Chip, CircularProgress, Box } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from "next/router";
import {  PayPalButtons } from "@paypal/react-paypal-js";
import { GetServerSideProps, NextPage } from 'next';
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces/order";
import { jwt } from "../../utils";
import { CreditCardOffOutlined } from "@mui/icons-material";
import { ferraroApi } from "../../api";


export type OrderResponseBody = {
  id: string;
  status:
      | "COMPLETED"
      | "SAVED"
      | "APPROVED"
      | "VOIDED"
      | "PAYER_ACTION_REQUIRED";
};


interface Props{
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  
    const {shippingAddress } = order;
    const router = useRouter()
    const [isPaying, setIsPaying] = useState(false);
    // if ( !shippingAddress ) {
    //   return <></>
    // }
  
    const onOrderCompleted = async( details: OrderResponseBody ) => {
         
        if ( details.status !== 'COMPLETED' ) {
          return alert('No hay pago en Paypal');
      }

      setIsPaying(true);

      try {
          
          const { data } = await ferraroApi.post(`/orders/pay`, {
              transactionId: details.id,
              orderId: order._id
          });

          router.reload();

      } catch (error) {
          setIsPaying(false);
          console.log(error);
          alert('Error');
      }

  }

    




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
                                              <span className={styles.spanxx}>ORDEN: {order._id}</span>
                                              <NextLink href='/cart' passHref>
                                              <span className={styles.spanxxx}>Editar</span>
                                              </NextLink>
                                     </div>
                                    
                                     <Box
                                     sx={{ display: isPaying ? 'flex' : 'none'}}
                                     >
                                      
                                      <CircularProgress /> 
                                    
                                     </Box>
                                
                                     {
                                      order.isPaid
                                      ? (
                                        <Chip
                                     label='Orden ya fue pagada'
                                     variant='outlined'
                                     color='success'
                                     icon={ <CreditCardOffOutlined /> }
                                     />
                                      ) :
                                      (
                                        <Chip
                                        label='Pendiente de pago'
                                        variant='outlined'
                                        color='error'
                                        icon={ <CreditCardOffOutlined /> }
                                        />
                                      )
                                     
                                     }
                                     
                                     <div className={styles.ferraroCart__list}>
                                             <CartList  products={ order.orderItems } />
                                     </div>
                                     <Divider sx={{ width: '80%', margin:'0px auto', mt: 5}}/>
                                     <div className={styles.ferraroCart__summary}>
                                              <OrdenSummary
                                               orderValues={{
                                                 numberOfItems:  order.numberOfItems,
                                                 subTotal: order.subTotal,
                                                 total: order.total,
                                                 tax: order.tax,
                                               }} />
                                     </div>
                                     <div className={styles.ferraroCart__checkout}>
                                           
                                     </div>
                                    
                         </div>
                  
                    </div>

                    <div className={styles.summaryColumnII}>
                             <div className={styles.orderBoxContainer}>
                                   <div className={styles.title__column}>
                                      <span>Resumen ({order.numberOfItems} { order.numberOfItems > 1 ? 'Producto' : 'Productos' })</span>
                                   </div>
                                   <Divider />
                                   <div className={styles.direccion__column}>
                                        <div className={styles.direccion_title}>
                                            <span className={styles.deliveryx}>Delivery address</span>
                                          
                                        </div>
                                        <div className={styles.datos_summary}>
                                            <span>{shippingAddress.firstName} {shippingAddress.lastName}</span>
                                            <span>{shippingAddress.address} {shippingAddress.address2 ? `, ${ shippingAddress.address2}` : '' }</span>
                                            <span>{shippingAddress.city} { shippingAddress.zip}</span>
                                            <span>{shippingAddress.country}</span>
                                            <span>{shippingAddress.phone}</span>
                                        </div>
                                   </div>
                                   <Divider />
                                   <div className={styles.paypalButton}>
                                      <PayPalButtons className={styles.paypal}
                                      createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {                                                   
                                                    amount: {
                                                        value: order.total.toString(),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order!.capture().then((details) => {
                                          onOrderCompleted(details);
                                            // console.log({details})
                                            // const name = details.payer.name!.given_name;
                                            // alert(`Transaction completed by ${name}`);
                                        });
                                    }}
                                />                  
                                   </div>
                             </div>
                    </div>


            </div>


            </div>

       </CartLayout>

    </div>
  )
}




export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
   const { id = ''} = query;
   const  { token = ''} = req.cookies;
   console.log('gafasfasf', token)
   let isValidToken = false
   let user;
   
  
   try {
     user = await jwt.isValidToken(token)
     console.log(user)
     isValidToken = true;
   } catch (error) {
     isValidToken = false
   }
 
   if (!isValidToken) {
     return {
       redirect: {
         destination: `/auth/login?p=/orders/${id}`,
         permanent: false,
       }
     }
   }
 
   const order = await dbOrders.getOrderById(id.toString())
 
   if (!order) {
     return {
       redirect: {
         destination: '`/orders/history`',
         permanent: false,
       }
     }
   }
  
  //  const yes = order.user;
  //  console.log('JAJAJAJAJAA',yes)
  //  if (order.user !== user) {
  //    return {
  //      redirect: {
  //        destination: '/orders/history',
  //        permanent: false,
  //      }
  //    }
  //  }
 

  return {
    props: {
       order
    }
  }
}

export default OrderPage;