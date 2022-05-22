import { MoralisCore } from '../MoralisCore';
import { BaseModule } from '../Modules/BaseModule';

export const makeMockModule = (core: MoralisCore): BaseModule => {
  const name = 'mockModule';

  class MockModule extends BaseModule {}
  const mockModule = new MockModule({
    core,
    name,
  });

  return mockModule;
};
