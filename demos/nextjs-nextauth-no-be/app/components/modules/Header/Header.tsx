import Image from 'next/image';
import { FC } from 'react';
import { Navbar } from '../../elements';
import { WalletInfo } from '../WalletInfo';
import styles from './Header.module.css';

const Header: FC = () => {
  return (
    <header className={styles.header__wrapper}>
      <nav className={styles.nav}>
        <Image src="/Moralis-Logo-LightBG.svg" width={125} height={30} alt="Moralis-Logo-LightBG" />
        <Navbar />
        <WalletInfo />
      </nav>
    </header>
  );
};

export default Header;
