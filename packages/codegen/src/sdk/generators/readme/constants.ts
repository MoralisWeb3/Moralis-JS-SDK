import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(dirname, '../../../../../..');

export const paths = {
  root,
  packages: path.join(root, 'packages'),
  templates: path.join(dirname, './templates'),
  umbrellaPackage: path.join(root, 'packages/moralis'),
};
