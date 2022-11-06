import Image from 'next/image';
import { indexProducts } from '../../../database/indexProducts';
import { ICatalogue } from '../../../interfaces/catalogue';
import styles from '../../../styles/Catalogue.module.css';
import { FC } from 'react';
import { CatalogueCard } from './CatalogueCard';

interface Props{
   catalogue: ICatalogue[];
}


export const Catalogue: FC<Props> = ({catalogue}) => {

   

  return (
   
    <div className='bodyError'>  
   <div className={styles.cardTopTitle}> OUR CAVE OF WONDERS
       
         <div className={styles.gridCatalogueContainer}>
         
            {
            catalogue.map( catalogues => (
               <CatalogueCard 
               key={catalogues.title}
               catalogue={catalogues}
               />
            ))
             
              
            }
             
         </div>
         </div>

         </div>   
     

  )
}
