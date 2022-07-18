import { createContext } from 'react';
import { ICoreContext } from './types';
const CoreContext = createContext<ICoreContext | null>(null);

export default CoreContext;
