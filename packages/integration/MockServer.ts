import { setupServer, SetupServerApi } from 'msw/lib/node';
import { MockScenarios } from './MockScenarios';

interface Options {
  apiRoot: string;
}
export class MockServer {
  private _scenarios: MockScenarios[] = [];
  server: SetupServerApi | null = null;
  options: Options;

  constructor(options: Options, scenarios: MockScenarios[]) {
    this.options = options;
    this.addScenarios(scenarios);
  }

  static create(options: Options, scenarios: MockScenarios[]) {
    return new MockServer(options, scenarios);
  }

  addScenario(scenarios: MockScenarios) {
    if (this._scenarios.find((scenario) => scenario.options.name === scenarios.options.name)) {
      throw new Error(`Handler with name ${scenarios.options.name} already exists`);
    }
    this._scenarios.push(scenarios);
  }

  addScenarios(scenarios: MockScenarios[]) {
    scenarios.forEach((scenario) => this.addScenario(scenario));
  }

  get listNames() {
    return this._scenarios.map((scenario) => scenario.options.name);
  }

  /**
   * Setup the server, this needs to be called before calling 'listen'
   */
  start() {
    if (this.server) {
      throw new Error('Server already started');
    }

    const handlers = this._scenarios
      .sort((a, b) => a.options.priority - b.options.priority)
      .map((scenario) => {
        scenario.options.url = `${this.options.apiRoot}${scenario.options.url}`;
        return scenario.makeMock();
      });

    this.server = setupServer(...handlers);

    return this;
  }

  /**
   * Close the server interceptions, this should be called after each test suit
   */
  close() {
    if (!this.server) {
      throw new Error('Server not started');
    }

    this.server.close();
  }

  /**
   * Start the server interceptions, this should be called after before test suit
   */
  listen(
    options: {
      onUnhandledRequest?: 'bypass' | 'error' | 'warn';
    } = {},
  ) {
    if (!this.server) {
      throw new Error('Server not started');
    }

    this.server.listen({
      onUnhandledRequest: options.onUnhandledRequest,
    });
  }
}
