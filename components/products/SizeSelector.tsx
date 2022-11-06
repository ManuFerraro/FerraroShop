import { ISize } from "../../interfaces/product"
import { FC } from 'react';
import styles from '../../styles/product/Slug.module.css';

interface Props{
    selectedSize?: ISize;
    size: ISize[]

    //Method
    onSelectedSize: (size: ISize ) => void;
}

export const SizeSelector: FC<Props> = ({selectedSize, size, onSelectedSize}) => {
  return (
   
    <div className={styles.sizeSelector_container}>
       {
        size.map( sizesss => (
             <button
                 key={sizesss}
                 className={styles.sizeSelector_sizesss}
                 style={{ color: selectedSize === sizesss ? 'red' : 'black' }}
                 onClick={ () => onSelectedSize(sizesss)}
             >
               {sizesss}
             </button>
        ))
       }

    </div>
  )
}
