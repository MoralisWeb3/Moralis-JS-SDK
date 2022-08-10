import { createMachine, StateMachine, EventObject, Typestate, interpret } from '@xstate/fsm';
import { CoreErrorCode, MoralisCoreError } from '../Error';

export type InitEvent = {
  type: 'xstate.init';
};

export class MoralisState<
  StateContext extends object,
  StateEvent extends EventObject,
  State extends Typestate<StateContext>,
> {
  private value: {
    config: StateMachine.Config<StateContext, StateEvent, State>;
    machine: StateMachine.Machine<StateContext, StateEvent, State>;
    service: StateMachine.Service<StateContext, StateEvent, State>;
  } | null = null;

  public constructor(public readonly name: string) {}

  private get isStarted() {
    if (!this.value) {
      return false;
    }
    return true;
  }

  private assertStarted() {
    const value = this.value;

    if (!value || !this.isStarted) {
      throw new MoralisCoreError({
        code: CoreErrorCode.STATE_MACHINE_NOT_STARTED,
        message: `State machine "${this.name}" not started. Call moralisState.start() first.`,
      });
    }

    return value;
  }

  public start(_config: StateMachine.Config<StateContext, StateEvent, State>) {
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

    this.value = {
      config,
      machine,
      service,
    };
    return this.value;
  }

  public get state() {
    const value = this.assertStarted();
    return value.service.state;
  }

  public get machine() {
    const value = this.assertStarted();
    return value.machine;
  }

  public get service() {
    const value = this.assertStarted();
    return value.service;
  }

  public match(value: State['value']) {
    this.assertStarted();
    return this.state.matches(value);
  }

  // Optimistic check if state can change
  // Note: this takes no guards into account at all, it only checks the config definition
  // to see if there is an event of the type defined
  public can(event: StateEvent['type']) {
    const state = this.state.value;

    const stateConfig = this.machine.config.states[state];
    const ons = stateConfig.on;

    return ons && Object.keys(ons).includes(event);
  }

  public transition(event: StateEvent) {
    const value = this.assertStarted();
    return value.service.send(event);
  }
}
