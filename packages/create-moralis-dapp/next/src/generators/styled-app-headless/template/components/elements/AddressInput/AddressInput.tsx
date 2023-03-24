import React from 'react';
import styles from './AddressInput.module.css';

interface AddressInputProps {
    address?: string;
    setAddress: (value: React.SetStateAction<string>) => void;
    fetch: () => void;
}

export default function AddressInput({ address, setAddress, fetch }: AddressInputProps) {
    return (
        <div className={styles.address_input}>
            <input name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button className={styles.search_btn} onClick={() => fetch()}>
                🔎
            </button>
        </div>
    );
}
