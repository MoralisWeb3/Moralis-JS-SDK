import React from 'react';
import { Footer, Header } from '../../modules';
import styles from './Default.module.css';

const Default: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
};

export default Default;
