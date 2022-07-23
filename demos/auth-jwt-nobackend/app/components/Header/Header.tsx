import Image from 'next/image';
import styles from '../../../styles/Home.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="https://moralis.io/" target="_blank" rel="noopener noreferrer">
        <Image src="/moralisLogo.svg" alt="Moralis Logo" width={155} height={47} />
      </a>
    </header>
  );
};

export default Header;
