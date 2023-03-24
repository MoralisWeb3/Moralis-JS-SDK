import path from 'path';
import { StylingSystemConfig } from '../../types';

export const headlessStylingConfig: StylingSystemConfig = {
  name: 'headless',
  template: path.join(__dirname, './template'),
  _app: {
    imports: `import '../styles/globals.css';`,
  },
};
