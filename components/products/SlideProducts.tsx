import { FC } from "react"
import { Slide } from 'react-slideshow-image';
import styles from '../../styles/product/SlideShow.module.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <div className={styles.displaySlide}>

    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
        
    >
       {
         images.map( image => {
           
             return (
              
              
                <div className={styles['each-slide']} key={ image }>
                   <div style={{
                     backgroundImage: `url(${ image })`,
                     backgroundSize: 'cover'
                   }}>

                   </div>
                </div>
                
                
             )
         })
       }
    </Slide>
    </div>
  )
}