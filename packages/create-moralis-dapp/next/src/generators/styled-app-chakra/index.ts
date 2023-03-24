import path from 'path';
import { StylingSystemConfig } from '../../types';

export const chakraStylingConfig: StylingSystemConfig = {
  name: 'chakra-ui',
  dependencies: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
  template: path.join(__dirname, './template'),
  _app: {
    imports: `import { ChakraProvider, extendTheme } from '@chakra-ui/react';`,
    configs: `
        const chakraTheme = extendTheme({
            styles: {
                global: {
                    body: {
                        bg: '#101419',
                    },
                },
            },
        });
    `,
    wrappers: [
      {
        name: 'ChakraProvider',
        props: [
          { name: 'resetCSS', value: 'true' },
          { name: 'theme', value: 'chakraTheme' },
        ],
      },
    ],
  },
};
