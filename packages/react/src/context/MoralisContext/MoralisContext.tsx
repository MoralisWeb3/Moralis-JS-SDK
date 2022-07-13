import { createContext } from 'react';
import { IMoralisContext } from './types';

const MoralisContext = createContext<null | IMoralisContext>(null);

export default MoralisContext;
