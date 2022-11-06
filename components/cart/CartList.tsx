import Image from 'next/image';
import { ItemCounter } from '../ui/ItemCounter';
import styles from './CartList.module.css';
import { useContext, FC } from 'react';
import NextLink from 'next/link';
import { ICartProduct } from '../../interfaces/cart';
import { CartContext } from '../../context/cart';
import { IOrderItem } from '../../interfaces/order';

interface Props{
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products}) => {

 const { cart, updateCardQuantity, removeCartProduct } = useContext(CartContext);

 const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCardQuantity(product);
 } 

 const productsToShow = products ? products : cart;

  return (
      <>
        {
          productsToShow.map( product => (

          
        
         <div className={styles.cartListContainer} key={product.slug + product.size}>
              <NextLink href={`/product/${product.slug}`} passHref>
               <div className={styles.cartListColumnI} >
                   <Image
                      src={product.image}
                      alt='fasf'
                      width={80}
                      height={80}
                      // src={require(`../../public/products/${product.image}`)}
                   />
               </div>
               </NextLink>
               <div className={styles.cartListColumnII}>
                     <div className={styles.carListTitle}>
                         <span>{product.title}</span>
                     </div>
                     <div className={styles.descriptionCartList}>
                         <div className={styles.descriptionI}>
                           <span>color: bleu craeyr</span>
                           <span>Size: {product.size}</span>
                           <span>Ref. H25242423</span>
                          </div>
                          <div className={styles.descriptionII}>
                                <ItemCounter
                                currentValue={ product.quantity }
                                updatedQuantity={ (newValue) => onNewCartQuantityValue(product as ICartProduct, newValue)}
                                maxValue={ 10 }
                                />
                          </div>
                     </div>
               </div>
               <div className={styles.cartListColumnIII}>
                      <button className={styles.removeProduct} onClick={ () => removeCartProduct(product as ICartProduct)}>
                        X
                      </button>
                      <div>
                        ${ product.price },00
                      </div>
               </div>
         </div>

          ))
        
    } 
        
      </> 
  )
}
