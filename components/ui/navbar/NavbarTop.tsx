import { Box, Typography } from '@mui/material';
import styles from '../../../styles/navbar/Navtop.module.css';


export const NavbarTop = () => {
  return (
    <div className={styles.topContainer}>
       <div className={styles.topHight}>
          
       </div>
        <div className={styles.topDown}>
           <div className={styles.listOnTop}>
                <ul>
                  <li>Italy</li>
                  <li>Find a store</li>
                  <li>Contact Us</li>
                </ul>
           </div>
        </div>
    </div> 
  )
}
