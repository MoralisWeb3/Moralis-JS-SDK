import { FC } from 'react';
import { Navbar } from '../../elements';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const WalletInfo = dynamic(() => import('../WalletInfo/WalletInfo'), {
  ssr: false,
});
import styles from './Header.module.css';

const Header: FC = () => {
  return (
    <header className={styles.header__wrapper}>
      <nav className={styles.nav}>
        <Link href="/">
          <a>
            <Image
              alt="Moralis-Logo-LightBG"
              className={styles.logo}
              height={30}
              src="/Moralis-Logo-LightBG.svg"
              width={125}
            />
          </a>
        </Link>
        <Navbar />
        <WalletInfo />
      </nav>
    </header>
  );
};

export default Header;
