import Core from '@moralisweb3/core';
import Evm from '@moralisweb3/evm';

describe('Moralis Core', () => {
  test('should remove evm module', () => {
    Core.registerModules([Evm]);
    Core.modules.remove('evm');
    let listModule = Core.modules.list();
    expect(listModule).not.toContain(Evm);
    expect(listModule.length).toBe(0);
    expect(listModule).not.toBeUndefined();
    expect(() => Core.modules.remove('evm')).toThrowErrorMatchingInlineSnapshot(
      `"[C0003] Module \\"evm\\" does not exist."`,
    );
  });
});
