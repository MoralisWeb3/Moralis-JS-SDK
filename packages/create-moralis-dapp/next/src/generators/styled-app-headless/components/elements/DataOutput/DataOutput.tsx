import React from 'react';
import styles from './DataOutput.module.css';

interface DataOutputProps {
    children: React.ReactNode;
}
export default function DataOutput({ children }: DataOutputProps) {
    return (
        <pre className={styles.pre} data-out>
            {children}
        </pre>
    );
}
