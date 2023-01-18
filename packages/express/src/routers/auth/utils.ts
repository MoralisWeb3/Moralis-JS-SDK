import ms from 'ms';

export const getExpirationTime = (sessionMaxAge: string | number) => {
  if (typeof sessionMaxAge === 'string') {
    sessionMaxAge = ms(sessionMaxAge);
  }
  return new Date(Date.now() + sessionMaxAge);
};
