import styles from '../../styles/checkout/Checkout.module.css';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
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
import { Divider, TextField,FormControl, Select, MenuItem } from '@mui/material';
import { countries } from '../../utils/countries';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';

 type FormData = {
     firstName: string;
     lastName: string;
     address: string;
     address2: string;
     zip: string;
     city: string;
     country: string;
     phone: string; 
 }
 
 const getAddressFromCookies = ():FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        phone: Cookies.get('phone') || '',
        country: Cookies.get('country') || '',
    }
 }


const AddressPage = () => {

    const onSubmitAddress = (data: FormData ) => {
        
        updateAddress(data); 
        router.push('/checkout/summary');
     }
    
    const { updateAddress } = useContext(CartContext);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
          
        
    });
    
  return (
    <CartLayout>
        <form onSubmit={handleSubmit(onSubmitAddress)}>
         <div className={styles.addressFullContainer}>
             <div className={styles.addressProgressContainer}>
             <div className={styles.addressProcessTitles}>
                     <ul>
                        <li className={styles.titleLixxx} >Cart</li>
                        <li className={styles.titleLix}>Checkout</li>
                        <li className={styles.titleLixx}>Confirmation</li>
                     </ul>
                 </div>
                <div className={styles.addressProcessIcon}>
                        <ul>
                            <li className={styles.lineStepActive}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStepActives}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStep}></li>
                            <li className={styles.circleStep}></li>
                            <li className={styles.lineStepFinal}></li>
                        </ul>
                  </div>
             </div>
             <div className={styles.addressBodyContainer}>
                   <div className={styles.addressColumnI}>
                        <div className={styles.address__title}>
                            <div className={styles.address__titleX}>
                                 <span>DELIVERY</span>
                            </div>
                           
                             <div className={styles.address__titleXX}>
                               <GrDeliver className={styles.address__titleIcon} />
                               <span>Ship to an address</span>
                            </div>
                        </div>
                        <Divider />
                        <div className={styles.address__subTitle}>
                            <span>Shipping address</span>
                        </div>
                        <Divider />
                        <div className={styles.address__subInfo}>
                            <span>* Required information</span>
                        </div>

                        <div className={styles.address__form}>
                              <div className={styles.form_name}>
                                 <TextField 
                                 id="outlined" 
                                 label='First name'
                                 variant='outlined'
                                 sx={{width:'48%'}}
                                 InputProps={{ sx: { height: 50 }}} 
                                 {...register('firstName',{
                                    required: 'Este campo es requerido',   
                                })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}   
                                 />
                                 <TextField
                                  id="outlined-basic"
                                  label='Last name' 
                                  variant='outlined' 
                                  sx={{width:'48%'}}
                                  InputProps={{ sx: { height: 50 }}}
                                  {...register('lastName',{
                                    required: 'Este campo es requerido',   
                                  })}
                                  error={!!errors.lastName}
                                  helperText={errors.lastName?.message} 
                                 />
                              </div>

                              <div className={styles.address_address}>
                                 <TextField
                                  label='Address' 
                                  variant='outlined'
                                  fullWidth 
                                  InputProps={{ sx: { height: 50 }}}
                                  {...register('address',{
                                    required: 'Este campo es requerido',   
                                  })}
                                  error={!!errors.address}
                                  helperText={errors.address?.message} 
                                  />
                              </div>
                              <div className={styles.address_address}>
                                 <TextField 
                                 label='Address optional'
                                 variant='outlined'
                                 InputProps={{ sx: { height: 50 }}} 
                                 fullWidth
                                 {...register('address2')}
                                 />
                              </div>

                              <div className={styles.address_address}>
                              <TextField 
                              label='City'
                              variant='outlined'
                              InputProps={{ sx: { height: 50 }}}
                              fullWidth
                              {...register('city',{
                                required: 'Este campo es requerido',   
                              })}
                              error={!!errors.city}
                              helperText={errors.city?.message}
                              />
                              </div>

                              <div className={styles.address_address}>
                              <TextField
                               label='Zip code'
                               variant='outlined' 
                               InputProps={{ sx: { height: 50 }}}
                               fullWidth
                               {...register('zip',{
                                required: 'Este campo es requerido',   
                              })}
                              error={!!errors.zip}
                              helperText={errors.zip?.message}
                               />
                              </div>

                              <div className={styles.address_address}>
                              <TextField 
                              label='Telephone number'
                              variant='outlined'
                              InputProps={{ sx: { height: 50 }}}
                              fullWidth
                              {...register('phone',{
                                required: 'Este campo es requerido',   
                              })}
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                              />
                              </div>

                              <div className={styles.address_address}>
                              <FormControl fullWidth>
                      
                                        <TextField
                                            select
                                            variant='outlined'
                                            label='País'
                                            defaultValue={Cookies.get('country') || countries[0].code}
                                            {...register('country',{
                                                required: 'Este campo es requerido',   
                                              })}
                                              error={!!errors.country}
                                              
                                        >
                                        {
                                            countries.map( country => (
                                                <MenuItem value={country.code}
                                                key={country.code}
                                                >{country.name}</MenuItem>
                                            ))
                                        }
                                        </TextField>
                        
                                        
                                </FormControl>
                              </div>

                        </div>
                        <div className={styles.address__finalButton}>
                              <button
                              type='submit'
                              >Realizar Pedido</button>
                        </div>

                   </div>
                   <div className={styles.addressColumnII}>
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
         </form>
    </CartLayout>
  )
}











export default AddressPage;