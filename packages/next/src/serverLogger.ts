import { LoggerController } from '@moralisweb3/common-core';
import Moralis from 'moralis';

export const serverLogger = LoggerController.create('nextjs', Moralis.Core);
