import { FC } from 'react';
import { TUserSession } from '../../../pages';
import styles from '../../../styles/Home.module.css';

const SessionInfo: FC<TUserSession> = ({ address, profileId, expirationTime }) => {
  return (
    <div className={styles.description}>
      <span>address: {address}</span>
      <br />
      <span>profileId: {profileId}</span>
      <br />
      <span>expirationTime: {expirationTime}</span>
      <br />
    </div>
  );
};

export default SessionInfo;
