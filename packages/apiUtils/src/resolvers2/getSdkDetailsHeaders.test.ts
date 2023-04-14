import { getSdkDetailsHeaders } from './getSdkDetailsHeaders';

describe('getSdkDetailsHeaders', () => {
  it('returns proper values', () => {
    const headers = getSdkDetailsHeaders();

    expect(headers['x-moralis-platform']).toBeDefined();
    expect(headers['x-moralis-platform-version']).toBeDefined();
    expect(headers['x-moralis-build-target']).toBeDefined();
  });
});
