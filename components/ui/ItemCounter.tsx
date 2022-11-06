import { FC } from 'react';
import styles from './Counter.module.css';


interface Props{
  currentValue: number;
  maxValue: number;

  //Methods
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props>= ({ currentValue, updatedQuantity, maxValue}) => {

  const addOrRemove = (value: number) => {
     if( value === - 1) {
      if (currentValue === 1 ) return;

      return updatedQuantity( currentValue -1)
     }

     if ( currentValue >= maxValue ) return;

     updatedQuantity( currentValue + 1);
  }




  return (
    <div className={styles.counterContainer}>
        <div className={styles.menos} onClick={ () => addOrRemove(-1)}>-</div>
        <div>{currentValue}</div>
        <div onClick={ () => addOrRemove(+1)}>+</div>
    </div>
  )
}
