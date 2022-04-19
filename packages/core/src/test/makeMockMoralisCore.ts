import { MoralisCore } from '../MoralisCore';
import { makeMockModule } from './makeMockModule';

export const makeMockMoralisCore = (): MoralisCore => {
  const core = new MoralisCore();
  const mockModule = makeMockModule(core);

  core.registerModules({
    modules: [mockModule],
  });

  return core;
};
