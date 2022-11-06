import { useEffect, useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/Ai';
import { selectUi, toggleAccount } from '../../store/features/toggleMenuSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from '../../styles/auth/Login.module.css';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Chip, TextField } from '@mui/material';
import { validation } from '../../utils';
import { ferraroApi } from '../../api';
import { MdErrorOutline } from 'react-icons/md';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';

type FormData = {
      email: string,
      password: string,
    };



export const Login = () => {

      const dispatch = useAppDispatch()
      const { toggleAccount: toggleSideAccount} = useAppSelector(selectUi);
      
        useEffect(() => {
            toggleSideAccount ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
        }, [toggleSideAccount])
      
      //HOOKFORMS
      const router = useRouter();
      const { loginUser } = useContext(AuthContext);
      const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
      const [showError, setShowError] = useState(false);

      const onLoginUser = async ({email, password}: FormData) => {

          setShowError(false);  

          const isValidLogin = await loginUser(email, password)
          if( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => {
            setShowError(false)   
            }, 3000);
          }

          if(isValidLogin) {
            dispatch(toggleAccount(!toggleSideAccount))
          }
        // router.replace('/');
            
      }

  return (
    <>
    
    {

    <div className={ toggleSideAccount ? styles.loginBlurContainer : ''}>
       <div className={toggleSideAccount ? styles.loginContainer : styles.container}>
          <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
           <div className={styles.loginMenu}>
                <div className={styles.loginTitle}>
                     <div className={styles.loginTitle__item}>
                       <AiOutlineClose className={styles.loginTitle__icon} onClick={ () =>dispatch(toggleAccount(!toggleSideAccount)) } />
                        <span>ACCOUNT</span>
                     </div>
                </div>
                <div className={styles.reqInformation}>
                    <span>* Required information</span>
                </div>
                <Chip 
                    label='No reconocemos ese usuario / contraseña'
                    color='error'
                    icon={<MdErrorOutline />}
                    className='fadeIn'
                    sx={{display: showError ? 'flex' : 'none'}}
                    />
                <div className={styles.loginFormContainer}>
                    <div className={styles.loginEmailContainer}> 
                          <span>E-mail *</span>
                          <TextField
                          type='email'
                          fullWidth
                          InputProps={{ sx: { height: 50 } }}
                          {...register('email',{
                               required: 'Este campo es requerido',
                               validate: validation.isEmail
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          />
                    </div>
                    <div className={styles.loginPasswordContainer}>
                          <span>Password *</span>
                          <TextField type='password' 
                          fullWidth
                          InputProps={{ sx: { height: 50 } }}
                          {...register('password',{
                              required: 'Este campo es requerido',
                              minLength: { value: 6, message:'Mínimo 6 caracteres'}
                          })}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                           />
                    </div>
                </div>
                <div className={styles.loginButtonPass}>
                      <button>Forgot your password?</button>
                </div>
                <div className={styles.singAnCreateContainer}>
                        <button type='submit'>Sing in</button>
                        <div className={styles.sing_in_or}>
                           <span className={styles.sing_in}>Or</span>
                        </div>
                        <NextLink href={ `/auth/register?p=${router.asPath}` } passHref>
                        <button
                        onClick={ () =>dispatch(toggleAccount(!toggleSideAccount)) }
                        >Create an account</button>
                        </NextLink>
                </div>
                <div className={styles.loginInformationDown}>
                      <h5>Thanks to your Hermès account, you will be able to:</h5>
                      <span>• Access your shopping cart</span>
                      <span>• Save your billing and delivery information to order faster</span>
                      <span>• Manage your address book</span>
                      <span>• Access all your orders and download the related invoices</span>
                      <span>• Manage your newsletter subscription </span>
                      <span>• Update your personal data</span>
                </div>
                <div className={styles.loginFooter}>
                        <span>HERE TO HELP</span>
                </div>
           </div>
           </form>  
       </div>
    </div>
  } 
    </>
  )
}
