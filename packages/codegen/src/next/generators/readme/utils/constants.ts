import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const paths = {
  packages: path.join(dirname, '../../../../../..'),
  templates: path.join(dirname, '../templates'),
};
