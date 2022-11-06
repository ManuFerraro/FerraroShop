import { Divider } from '@mui/material';
import React from 'react'
import { ProductLayout } from '../../components/layouts/ProductLayout'
import styles from '../../styles/search/Search.module.css';
import { NextPage, GetServerSideProps } from 'next';
import AllProducts from '../../components/products/AllProducts';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/product';


interface Props{
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}



const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  

  return (
    <ProductLayout>
       
          <div className={styles.searchContainer}> 

          {
            foundProducts ? (
                <div className={styles.searchTitleContainer}>
                    <span>Producto buscado:</span>
                    <div className={styles.searchSubtitle}>{ query }</div>
                </div>

             ): (   
                  <>
                    <div className={styles.searchTitleContainer}>
                       <span>No se encontró ninún producto relacionado a tu búsqueda:</span>
                         <div className={styles.searchSubtitle}>{ query }</div>
                    </div>
                    <span className={styles.noSearch}>Pueden interesarte los siguientes productos:</span>
                  </>
             )
          }
              
               <Divider />
               <div>
                  <AllProducts productss={ products } />
               </div>
          </div>
      
      </ProductLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
    const { query = '' } = params as { query: string};
    
    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0; //Para saber si existen products.
    
    if(!foundProducts ) {
      products = await dbProducts.getProductsByTerm('shirt');
 }    

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}



export default SearchPage;