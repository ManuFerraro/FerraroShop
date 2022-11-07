import Image from 'next/image';
import { Light } from '../../../assets/images';
import styles from '../../../styles/BodyInfo.module.css';

export const BodyInfo = () => {
  return (

    <div className='bodyError'>
    <div className={styles.topInfoContainer}>
    <div className={styles.topInfoTitleContainer}>
         <span>A LIGHTHEARTED DAY</span>
    </div>
    <div className={styles.topInfoBodyContainer}>
        <div className={styles.topInfoBodyP}>
        <p>On a hidden terrace nestled above the 24 Faubourg boutique, objects from the Autumn-Winter collection have come together.</p>
        <div className={styles.topInfoButton}>Discover the film</div>
        </div>
    </div>
     <div className={styles.topBodyImages}>
       <Image
          src={Light}
          alt='Lightearted'
          className={styles.ImageAngel}
       />
     </div>
</div>
</div>
  )
}
