import  NextLink  from 'next/link';
import { useForm } from 'react-hook-form';
import { ShopLayout } from '../../components/layouts';
import { BodyInfo } from '../../components/ui/bodyproducts/BodyInfo';
import { Catalogue } from '../../components/ui/catalogue/CatalogueList';
import { TopInfo } from '../../components/ui/topinfo/TopInfo';
import useSWR from "swr";
import styles from '../../styles/auth/Register.module.css';
import { Chip, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { validation } from '../../utils';
import { ferraroApi } from '../../api';
import { MdErrorOutline } from 'react-icons/md';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';


const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())
type FormData = {
    name: string;
    email: string;
    password: string;
   } 


const RegisterPage = () => {
  
   //USEFORM
   const router = useRouter();
   const { registerUser }= useContext(AuthContext)
 
   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const onRegisterForm = async ( {name, email, password}: FormData) => {
          
    setShowError(false);  
    const { hasError, message} = await registerUser(name, email, password);

      if(hasError) {
        setShowError(true);
        setErrorMessage(message!);
        setTimeout(() => {
        setShowError(false)   
        }, 3000);
        return;
      }
      const destination = router.query.p?.toString() || '/';
      router.replace(destination);
   
   }

   const { data, error } = useSWR('/api/catalogue', fetcher)

   if (error) return <div>failed to load</div>
   if (!data) return <div>loading...</div>
   

    return (
      <ShopLayout> 
           <TopInfo />
           <Catalogue  catalogue={ data }/>
               <div className={styles.registerBlurContainer}>
                   <div className={styles.registerContainer}>
                   <form onSubmit={ handleSubmit(onRegisterForm)} noValidate>
                       <NextLink href='/'>
                       <div className={styles.closedRegister}>
                        X
                       </div>
                       </NextLink>
                       <div className={styles.registerColI}> 
                         <span>CREAR CUENTA</span>
                       </div>
                       <Chip 
                        label='No reconocemos ese usuario / contraseña'
                        color='error'
                        icon={<MdErrorOutline />}
                        className='fadeIn'
                        sx={{display: showError ? 'flex' : 'none'}}
                        />
                       <div className={styles.registerColII}> 
                         
                           <div className={styles.registerFormContainer}>
                                <div className={styles.registerNameContainer}>
                                   <span>Nombre Completo *</span>
                                   <TextField
                                   type='name'
                                   fullWidth
                                   InputProps={{ sx: { height: 40 } }}
                                   {...register('name',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message:'Mínimo 2 caracteres'}
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                   />
                                </div>
                                <div className={styles.registerEmailContainer}>
                                   <span>Email *</span>
                                   <TextField
                                   type='email'
                                   fullWidth
                                   InputProps={{ sx: { height: 40 } }}
                                   {...register('email',{
                                    required: 'Este campo es requerido',
                                    validate: validation.isEmail
                                   })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                   />
                                </div>
                                <div className={styles.registerPasswordContainer}>
                                   <span>Password *</span>
                                   <TextField
                                   type='password'
                                   fullWidth
                                   InputProps={{ sx: { height: 40 } }}
                                   {...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message:'Mínimo 6 caracteres'}
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                   />
                                </div>
                            </div>
                          
                       </div>
                       <div className={styles.registerColIII}>
                          
                              <button type='submit'>Ingresar</button>
                         
                            <NextLink href='/' passHref >
                              <span>¿Ya tienes cuenta?</span>
                            </NextLink>  
                       </div>
                       </form>
                   </div>
               </div>

           <BodyInfo />
      </ShopLayout>
    )
}

export default RegisterPage;