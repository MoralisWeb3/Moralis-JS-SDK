import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <a href="https://moralis.io" target="_blank">
                <Image width={150} height={45} src="/Moralis.svg" className={styles.logo} alt="Moralis logo" />
            </a>
            <div>
                <ConnectButton />
            </div>
        </header>
    );
}
