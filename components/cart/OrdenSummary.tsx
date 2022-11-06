import styles from './Orden.module.css';
import { useContext, FC } from 'react';

import { currency } from '../../utils';
import { CartContext } from '../../context/cart';

interface Props{
  orderValues?: {
    numberOfItems: number;
     subTotal: number;
      total: number;
       tax: number;
  }
  
}


export const OrdenSummary: FC<Props> = ({ orderValues }) => {

  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  
  const summaryaValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax};
  

  return (

    <div className={styles.ordenSummaryContainer}>
    
            <div className={styles.ordenColI}>
                <span>Cantidad</span>
                <div>{summaryaValues.numberOfItems}</div>
            </div>
            <div className={styles.ordenColII}>
                <span>Inpuestos</span>
                <div>{currency.format(summaryaValues.tax)}</div>
            </div>
            <div className={styles.ordenColIII}>
                <span>Total</span>
                <div>{currency.format(summaryaValues.total)}</div>
            </div>
    </div> 
  )
}
