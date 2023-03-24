import React from 'react';
import styles from './Button.module.css';

// eslint-disable-next-line no-undef
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    );
}
