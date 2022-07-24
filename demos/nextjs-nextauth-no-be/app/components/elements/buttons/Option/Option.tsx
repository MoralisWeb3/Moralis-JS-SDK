import Image from 'next/image';
import { FC } from 'react';
import styles from './Option.module.css';

export interface IOption {
  name: string;
  logoPath: string;
}

const Option: FC<IOption> = ({ name, logoPath }) => {
  return (
    <div className={styles.option}>
      <div className={styles.info}>
        <Image src={logoPath} alt={name} width={40} height={40} />
        <span className={styles.name}>{name}</span>
      </div>
      <Image src="/assets/chevronRight.svg" alt="chevronRight" width={24} height={24} />
    </div>
  );
};

export default Option;
