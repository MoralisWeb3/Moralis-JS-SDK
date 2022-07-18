import { createContext } from 'react';
import { IMoralisContext } from './types';

const MoralisContext = createContext<IMoralisContext | null>(null);

export default MoralisContext;
