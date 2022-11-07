import Image from 'next/image';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { CiYoutube } from 'react-icons/Ci';
import { FiFacebook } from 'react-icons/fi';
import styles from '../../styles/footer/Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
          <div className={styles.footerColI}>
               <div className={styles.footerServices}>
                    <h1>SERVICES</h1>
                    <span>Contact us</span>
                    <span>FAQ</span>
                    <span>Find a store</span>
                    <span>Stores selling beauty products</span>
                    <span>Gifting</span>
                    <span>Made to measure</span>
                    <span>Maintenace and repair</span>
               </div>
               <div className={styles.orders}>
                     <h1>ORDERS</h1>
                     <span>Payment</span>
                     <span>Shipping</span>
                     <span>Collect in store</span>
                     <span>Track orders</span>
                     <span>Returns & exchanges</span>
               </div>
               <div className={styles.maison}>
                     <h1>LA MAISON HERMÈS</h1>
                     <span>Sustainable development</span>
                     <span>The Hermès Foundation</span>
                     <span>Join Hermès</span>
                     <span>Finance & Governance</span>
                     <span>Our partner brands</span>
               </div>
               <div className={styles.legal}>
                     <h1>LEGAL</h1>
                     <span>Terms and conditions</span>
                     <span>Privacy & cookies</span>
                     <span>BCR</span>
                     <span>California Transparency in Supply Chain Act</span>
                     <span>Transparency in coverage</span>
                     <span>Legal issues</span>
               </div>
          </div>
          <div className={styles.footerColII}>
                  <div className={styles.footerSpanes}>
                      <span> © Ferraro 2022. All rights reserved.</span>
                  </div>

                  <div className={styles.footerIcons}>
                    <AiOutlineInstagram />
                    <FiFacebook />
                    <AiOutlineTwitter />
                    <CiYoutube />
                  </div>
          </div>
          <div className={styles.footerColIII}>
                   <Image 
                   src={require('../../public/ITALY.png')}
                   />
          </div>
    </div>
  )
}
