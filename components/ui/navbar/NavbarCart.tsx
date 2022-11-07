import styles from './navbarcart.module.css'
import { BiArrowBack } from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Logo, LogoSmall } from '../../../assets/images';



export const NavbarCart = () => {
  
  const router = useRouter();
  const destination = router.query.p?.toString() || '/';

  return (
    <div className={styles.navContainerC}>
      <div className={styles.navColIC}>
        <div className={styles.navMenuContainerC}>
         
        </div>
         <NextLink href={destination} passHref>
        <div className={styles.navSearchContainerC}>
            <BiArrowBack className={styles.navArrow} />
            <span>Back</span>
        </div>
        </NextLink>
       
      </div>
      <NextLink href='/' passHref>
        <div className={styles.navColIIC}>
          <Image
            className={styles.logoMenu}
            src={Logo}
            alt="FERRARO"
            width={95}
            height={60}
          />
        </div>
        </NextLink>
      <NextLink href='/' passHref>
      <div className={styles.navColIIR}>
        <Image
          className={styles.logoMenuResponsive}
          src={LogoSmall}
          alt="FERRARO"
          width={50}
          height={30}
        />
      </div>
      </NextLink>
      <div className={styles.navColIIIC}>
           
      </div>
    </div>
  );
};
