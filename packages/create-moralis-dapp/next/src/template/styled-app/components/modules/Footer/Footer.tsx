import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                🙋 You have questions? Ask them on the{' '}
                <a href="https://forum.moralis.io/" target="_blank">
                    Moralis forum
                </a>
            </p>
            <p>
                📖 Read more about{' '}
                <a href="https://moralis.io/" target="_blank">
                    Moralis
                </a>
            </p>
        </footer>
    );
}
