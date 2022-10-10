import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { rest, ResponseComposition, RestRequest, PathParams, RestContext } from 'msw';
import { MOCK_API_KEY } from './mockRequests/config';

type Condition = Record<string, unknown>;
type Response = Record<string, unknown>;
type Params = PathParams<string>;

const DEFAULT_RESPONSE_STATUS = 200;
const DEFAULT_PRIORITY = 5;

export interface MockScenario {
  condition: Condition;
  responseStatus?: number;
  response: Response;
}

export interface MockScenariosOptions {
  method: 'get' | 'post' | 'put' | 'delete';
  // Should return an object with the params that will be used to match the scenario conditions
  getParams: (
    req: RestRequest<Response, Params>,
    res: ResponseComposition<Response>,
    ctx: RestContext,
  ) => Record<string, unknown>;
  // Optional hook to run logic after matching scenarios
  beforeScenarios?: (req: RestRequest<Response, Params>, res: ResponseComposition<Response>, ctx: RestContext) => void;
  // Optional hook to run logic before matching scenarios
  afterScenarios?: (req: RestRequest<Response, Params>, res: ResponseComposition<Response>, ctx: RestContext) => void;
  // Url of the mock (see https://mswjs.io/docs/api/rest)
  url: string;
  // Name of the mock (used in error messages)
  name: string;
  // Optional priority (default = 5), to make sure the handler is listed before/after certain other handlers
  priority?: number;
}

/**
 * Class to implement mock scenarios for api tests.
 * This will create a mock that will return the given response, provided the request matches the given condition.
 * If no condition is matched, the mock will throw an Error
 */
export class MockScenarios {
  public scenarios: MockScenario[] = [];
  public options: MockScenariosOptions & Required<Pick<MockScenariosOptions, 'priority'>>;

  constructor(options: MockScenariosOptions, scenarios: MockScenario[]) {
    this.scenarios = scenarios;
    this.options = { ...options, priority: options.priority ?? DEFAULT_PRIORITY };
  }

  static create(options: MockScenariosOptions, scenarios: MockScenario[]) {
    return new MockScenarios(options, scenarios);
  }

  addScenario = (scenario: MockScenario) => {
    this.scenarios.push(scenario);
  };

  makeMock = () => {
    const { method, url } = this.options;

    switch (method) {
      case 'delete':
        return rest.delete(url, this.mockRequest);
      case 'post':
        return rest.post(url, this.mockRequest);
      case 'put':
        return rest.put(url, this.mockRequest);
      case 'get':
        return rest.get(url, this.mockRequest);
      default:
        throw new Error(`Method ${method} not supported`);
    }
  };

  private mockRequest = (req: RestRequest<Response, Params>, res: ResponseComposition<Response>, ctx: RestContext) => {
    const { name, getParams, beforeScenarios, afterScenarios } = this.options;

    const apiKey = req.headers.get('x-api-key');

    if (apiKey !== MOCK_API_KEY) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Api Key Not Present',
        }),
      );
    }

    const params = omitBy(getParams(req, res, ctx), isNil);
    const scenario = this.scenarios.find(({ condition }) => isEqual(condition, params));

    if (beforeScenarios) {
      beforeScenarios(req, res, ctx);
    }

    if (!scenario) {
      throw new Error(`${name} failed, no scenarios with: ${JSON.stringify(params)}`);
    }

    if (afterScenarios) {
      afterScenarios(req, res, ctx);
    }

    return res(ctx.status(scenario.responseStatus ?? DEFAULT_RESPONSE_STATUS), ctx.json(scenario.response));
  };
}
