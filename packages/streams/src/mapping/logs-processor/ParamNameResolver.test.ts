import { ParamNameResolver } from './ParamNameResolver';

describe('ParamNameResolver', () => {
  it('resolves correctly', () => {
    const resolver = new ParamNameResolver(['alfa', 'beta']);

    expect(resolver.resolve('foo')).toEqual('foo');
    expect(resolver.resolve('bar')).toEqual('bar');

    expect(resolver.resolve('beta')).toEqual('_beta');

    expect(resolver.resolve('alfa')).toEqual('_alfa');
    expect(resolver.resolve('_alfa')).toEqual('__alfa');
    expect(resolver.resolve('__alfa')).toEqual('___alfa');
    expect(resolver.resolve('____alfa')).toEqual('____alfa');
    expect(resolver.resolve('___alfa')).toEqual('_____alfa');
  });
});
