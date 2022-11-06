import { Divider } from '@mui/material';
import React from 'react'
import { ProductLayout } from '../../components/layouts/ProductLayout'
import styles from '../../styles/category/Men.module.css';
import { NextPage } from 'next';
import MenProducts from '../../components/products/MenProducts';
import WomenProducts from '../../components/products/WomenProducts';
import { useProducts } from '../../hooks';

const WomenPage: NextPage = () => {

 
  const { products, isLoading } = useProducts('/products?gender=women');
   
    
  

  return (
    <ProductLayout>
       
          <div className={styles.menContainer}> 
               <div className={styles.menTitleContainer}>
                      <span>WOMEN</span>
                      <div className={styles.menSubtitle}>FALL-WINTER 2022 COLLECTION</div>
               </div>
               <Divider />
               <div>
                  <WomenProducts productss={ products } />
               </div>
          </div>
      
      </ProductLayout>
  )
}

export default WomenPage;