import Core from '@moralisweb3/common-core';
import { Auth } from './Auth';

export interface AuthAdapter {
  createAuth(core: Core): Promise<Auth>;
}
