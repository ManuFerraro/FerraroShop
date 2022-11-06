import styles from '../../../styles/TopInfo.module.css';

export const TopInfo = () => {
  return (
    <div className='bodyError'>
    <div className={styles.topInfoContainer}>
        <div className={styles.topInfoTitleContainer}>
             <span>ARCEAU LE TEMPS VOYAGEUR</span>
        </div>
        <div className={styles.topInfoBodyContainer}>
            <div className={styles.topInfoBodyP}>
            <p>The Hermès journey continues towards new dreamlike horizons.&nbsp;Where time takes on a singular dimension. Borders are blurred and movement is light and joyful. The hours of the world are an invitation to experience ubiquity – here or elsewhere – as the spirit takes flight, be free and live in the present.</p>
            <div className={styles.topInfoButton}>Discover</div>
            </div>
            
        </div>
    </div>
    </div>
  )
}
