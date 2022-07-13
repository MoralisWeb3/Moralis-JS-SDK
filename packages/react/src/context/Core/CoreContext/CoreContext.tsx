import { createContext } from 'react';
import { ICoreContext } from './types';
const CoreContext = createContext<null | ICoreContext>(null);

export default CoreContext;
