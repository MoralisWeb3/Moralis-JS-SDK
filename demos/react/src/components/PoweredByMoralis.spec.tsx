import React from 'react';
import { render } from '@testing-library/react';
import { PoweredByMoralis } from './PoweredByMoralis';

describe('PoweredByMoralis', () => {
  it('renders child correctly', () => {
    const { container } = render(<PoweredByMoralis />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('svg')).toBeDefined();
  });
});
