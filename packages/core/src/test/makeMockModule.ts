import { MoralisCore } from '../MoralisCore';
import { BaseClass } from '../BaseClass/BaseClass';

export const makeMockModule = (core: MoralisCore): BaseClass => {
  const name = 'mockModule';

  class MockModule extends BaseClass {}
  const mockModule = new MockModule({
    core,
    name,
  });

  return mockModule;
};
