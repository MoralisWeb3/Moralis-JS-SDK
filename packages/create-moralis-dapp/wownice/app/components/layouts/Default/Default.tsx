import { FC, ReactNode } from 'react';
import { Header } from '../../modules/Header';
import Image from 'next/image';
import styles from './Default.module.css';

const links = [
  { name: 'Forum', href: 'https://moralis.io/' },
  { name: 'Discord', href: 'https://moralis.io/joindiscord/' },
  { name: 'Docs', href: 'https://docs.moralis.io/introduction/readme' },
  { name: 'Blog', href: 'https://moralis.io/blog/' },
  { name: 'Youtube', href: 'https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw' },
];

const Default: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      <div className={styles.links}>
        {links.map(({ href, name }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" key={name} className={styles.link}>
            {name}
          </a>
        ))}
      </div>
      <a href="https://moralis.io/" target="_blank" rel="noopener noreferrer">
        <Image src="/assets/poweredByMoralis.svg" alt="Powered By Moralis Logo" width={173} height={28} />
      </a>
    </footer>
  </div>
);

export default Default;
