import Image from 'next/image';
import { indexProducts } from '../../../database/indexProducts';
import { ICatalogue } from '../../../interfaces/catalogue';
import styles from '../../../styles/Catalogue.module.css';
import { FC } from 'react';

interface Props{
    catalogue: ICatalogue
}

export const CatalogueCard: FC<Props>= ({catalogue}) => {


  return (
    <div className={styles.cardContainer} key={catalogue.title}>
    <div className={styles.cardImg}>
    <Image
              src={require(`../../../public/FerraroE/${catalogue.image}`)}
              alt= {catalogue.title}
          />
    </div>    
    <div className={styles.cardTitle}>
              {catalogue.title}
    </div>
     </div>
  )
}
