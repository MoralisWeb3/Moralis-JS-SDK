import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Navbar.module.css';

const pages = [
  {
    href: '/',
    name: 'User',
  },
  {
    href: '/private',
    name: 'Private Page',
  },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.nav}>
      {pages.map(({ href, name }) => (
        <Link href={href} key={name}>
          <a className={`${styles.tab} ${href === pathname ? styles.active : null}`}> {name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
