import { Footer, Guides, Header, Meta } from '../app/components';
import { GetServerSideProps, NextPage } from 'next';
import { SessionInfo } from '../app/components/SessionInfo';
import { verify } from 'jsonwebtoken';
import styles from '../styles/Home.module.css';
import { LoginButton } from '../app/components/LoginButton';

export type TUserSession = { address: string; profileId: string; expirationTime: string };

const Home: NextPage<TUserSession> = (session) => {
  return (
    <div className={styles.container}>
      <Meta />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Next.js <a href="https://moralis.io/">Moralis.Auth</a> Demo
        </h1>
        <SessionInfo {...session} />
        {session.profileId ? <button className={styles.logoutButton}>Logout</button> : <LoginButton />}

        <Guides />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const MoralisAuthJWT = req.cookies.MoralisAuthJWT;

  const secret = process.env.SECRET;
  if (!MoralisAuthJWT || !secret) {
    return { props: {} };
  }
  const session = verify(MoralisAuthJWT, secret);
  return {
    props: session as TUserSession,
  };
};
