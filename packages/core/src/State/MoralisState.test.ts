import { MoralisState } from './MoralisState';

interface TestContext {
  counter: number;
}

interface AlfaBlueTestEvent {
  type: 'ALFA_BLUE';
}

interface BetaRedTestEvent {
  type: 'BETA_RED';
}

type TestEvents = AlfaBlueTestEvent | BetaRedTestEvent;

interface TestState {
  value: string;
  context: TestContext;
}

describe('MoralisState', () => {
  let state: MoralisState<TestContext, TestEvents, TestState>;
  const config = {
    initial: 'alfa',
    states: {
      alfa: {
        entry: (contex: TestContext) => {
          contex.counter *= 2;
        },
        on: {
          ALFA_BLUE: {
            target: 'beta',
          },
        },
      },
      beta: {
        entry: (contex: TestContext) => {
          contex.counter *= 3;
        },
        on: {
          BETA_RED: {
            target: 'alfa',
          },
        },
      },
    },
    context: {
      counter: 1,
    },
  };

  beforeEach(() => {
    state = new MoralisState('test');
  });

  it('returns a name', () => {
    expect(state.name).toEqual('test');
  });

  it('works as expected', () => {
    state.start(config);

    expect(state.service).toBeDefined();
    expect(state.service).toBeDefined();
    expect(state.machine).toBeDefined();

    expect(state.match('alfa')).toEqual(true);
    expect(state.state.context.counter).toEqual(2);

    expect(state.can('ALFA_BLUE')).toEqual(true);
    expect(state.can('BETA_RED')).toEqual(false);
    state.transition({ type: 'ALFA_BLUE' });

    expect(state.state.value).toEqual('beta');
    expect(state.state.context.counter).toEqual(6);

    expect(state.can('ALFA_BLUE')).toEqual(false);
    expect(state.can('BETA_RED')).toEqual(true);
    state.transition({ type: 'BETA_RED' });

    expect(state.match('alfa')).toEqual(true);
  });

  it('cannot start second time', () => {
    state.start(config);
    expect(() => state.start(config)).toThrowError('[C0011] State machine "test" already started');
  });

  describe('throws an error if not started', () => {
    const expectedError = '[C0012] State machine "test" not started';

    it('state', () => {
      expect(() => state.state).toThrowError(expectedError);
    });

    it('machine', () => {
      expect(() => state.machine).toThrowError(expectedError);
    });

    it('service', () => {
      expect(() => state.service).toThrowError(expectedError);
    });
  });
});
