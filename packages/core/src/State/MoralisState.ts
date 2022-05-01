import { createMachine, StateMachine, EventObject, Typestate, interpret } from '@xstate/fsm';
import { CoreErrorCode, MoralisCoreError } from '../Error';

export type InitEvent = {
  type: 'xstate.init';
};

export type MoralisStateConfig<
  StateContext extends object,
  StateEvent extends EventObject,
  State extends Typestate<StateContext>,
> = StateMachine.Config<StateContext, StateEvent, State>;

export class MoralisState<
  StateContext extends object,
  StateEvent extends EventObject,
  State extends Typestate<StateContext>,
> {
  name;
  private _value: {
    config: StateMachine.Config<StateContext, StateEvent, State>;
    machine: StateMachine.Machine<StateContext, StateEvent, State>;
    service: StateMachine.Service<StateContext, StateEvent, State>;
  } | null = null;

  constructor(name: string) {
    this.name = name;
  }

  private get isStarted() {
    if (!this._value) {
      return false;
    }
    return true;
  }

  private assertStarted() {
    if (!this.isStarted) {
      throw new MoralisCoreError({
        code: CoreErrorCode.STATE_MACHINE_NOT_STARTED,
        message: `State machine "${this.name}" not started. Call moralisState.start() first.`,
      });
    }
  }

  start(_config: StateMachine.Config<StateContext, StateEvent, State>) {
    if (this.isStarted) {
      throw new MoralisCoreError({
        code: CoreErrorCode.STATE_MACHINE_STARTED,
        message: `State machine "${this.name}" already started.`,
      });
    }

    const config = {
      id: this.name,
      ..._config,
    };
    const machine = createMachine(config);
    const service = interpret(machine).start();

    this._value = {
      config,
      machine,
      service,
    };

    return this._value;
  }

  get state() {
    this.assertStarted();
    return this._value!.service.state;
  }

  get machine() {
    this.assertStarted();
    return this._value!.machine;
  }

  get service() {
    this.assertStarted();
    return this._value!.service;
  }

  match(value: State['value']) {
    this.assertStarted();
    return this.state.matches(value);
  }

  // Optimistic check if state can change
  // Note: this takes no guards into account at all, it only checks the config definition
  // to see if there is an event of the type defined
  can(event: StateEvent['type']) {
    const state = this.state.value;

    const stateConfig = this.machine.config.states[state];
    const ons = stateConfig.on;

    if (!ons) {
      return false;
    }

    return Object.keys(ons).includes(event);
  }

  transition(event: StateEvent) {
    this.assertStarted();
    return this._value!.service.send(event);
  }
}
