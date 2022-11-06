import styles from '../../styles/category/MenProducts.module.css';
import { FC } from 'react';
import { IProduct } from '../../interfaces/product';
import Image from 'next/image';
import NextLink from 'next/link';

interface Props{
   productss: IProduct[]
}


const AllProducts: FC<Props> = ({productss}) => {



  return (
    <div className={styles.menListProductContainer}>
        {
           productss.map( (products, index) => (
            <div key={index} className={styles.cardMenProducts} >
              <NextLink href={`/product/${products.slug}`} passHref>
            <div className={styles.carMenImages} >
            
                    <Image
                      src={products.images[0]}
                      alt={products.title}
                      width={400}
                      height={400}
                    />
               
                  
            </div>
            </NextLink>
            <div className={styles.cardMenTitle}>
                   {products.title}
            </div>
            <div className={styles.cardMenPrice}>
                   {`$${products.price}`}
            </div>
            
            </div>
            
           ))
        


        }
           
    </div>
  )
}

export default AllProducts;