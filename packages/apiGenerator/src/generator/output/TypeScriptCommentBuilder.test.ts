import { MemoryOutput } from './MemoryOutput';
import { TypeScriptCommentBuilder } from './TypeScriptCommentBuilder';

describe('TypeScriptCommentBuilder', () => {
  let output: MemoryOutput;
  let builder: TypeScriptCommentBuilder;

  beforeEach(() => {
    output = new MemoryOutput();
    builder = new TypeScriptCommentBuilder(output, 0);
  });

  function getLine1(): string {
    return output.toString().split('\r\n')[1];
  }

  it('creates @description', () => {
    builder.description('lorem ipsum').apply();
    expect(getLine1()).toBe(` * @description lorem ipsum`);
  });

  it('creates required @param with type', () => {
    builder.param('String', 'network', true, 'My network').apply();
    expect(getLine1()).toBe(` * @param {String} network My network`);
  });

  it('creates optional @param with type', () => {
    builder.param('String', 'network', false, 'My network').apply();
    expect(getLine1()).toBe(` * @param {String} [network] My network (optional)`);
  });

  it('creates optional @param with no type', () => {
    builder.param(null, 'network', false, 'My network').apply();
    expect(getLine1()).toBe(` * @param [network] My network (optional)`);
  });

  it('creates @returns with no type', () => {
    builder.returns(null, 'Some data').apply();
    expect(getLine1()).toBe(` * @returns Some data`);
  });

  it('creates @returns with type', () => {
    builder.returns('Number', 'Some data').apply();
    expect(getLine1()).toBe(` * @returns {Number} Some data`);
  });
});
