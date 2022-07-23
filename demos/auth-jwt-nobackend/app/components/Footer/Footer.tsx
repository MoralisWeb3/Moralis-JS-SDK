import Image from 'next/image';
import styles from '../../../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image src="/poweredByMoralis.svg" alt="Moralis Logo" width={245} height={69} />
      </a>
    </footer>
  );
};

export default Footer;
