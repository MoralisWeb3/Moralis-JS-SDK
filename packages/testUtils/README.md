# @moralisweb3/test-utils

This package contains utils for writing tests

## Test scenarios

`MockScenarios` and `MockServer` can be used to write test scenarios for apis. It will implement a mock server (via `msw`) for each request that validates the provided condition. In turn it will return the provided response.

This will:
- Create a mock server to mock the provided method
- Will return the given response when the given condition is met
- Will return an error otherwise

Implementing these scenarios will ensure that the correct requests are being called with the correct parameters.

To create scenarios:

### 1. Create a server
- Create the mockServer instance with the `apiRoot` url and the test `apiKey`.
- Then add the scenarios.
- Then start the server to make it ready for use

```typescript
import { MockServer } from '@moralisweb3/test-utils';

const mockServer = MockServer.create({apiKey, apiRoot}, [
  scenario1,
  scenario2.
  ...
]).start()
```

### 2. Create scenarios
New scenarios can be created via `MockScenarios.create`. The first argument is an options object with the following properties:
- `method`: 'post' | 'get' | 'put' | 'delete'
- `name`: any name for debuging purposes
- `url`: the url that will be mocked (needs to be valid msw url: https://mswjs.io/docs/basics/request-handler). This url wil be prefixed with the `baseUrl`
- `getParams`: a function to resolve the request values to an object that is used in the condition check

For example:
```typescript
export const mockAddAddressEvm = MockScenarios.create(
  {
    method: 'post',
    name: 'mockAddAddressEvm',
    url: `/streams/evm/:id/address`,
    getParams: (req) => ({
      id: req.params.id,
      address: req.body.address,
    }),
  },
  scenarios
);
```

Then add scenarios. For each scenario you need:

- The condition when the response should be returned
- The response that will be returned
- (optional) the response status (defaults to 200)

```typescript
const scenarios = [
    {
      condition: {
        id: '1',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
      },
      response: createResponse('success'),
    },
        {
      condition: {
        id: '1',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
      },
      response: createErrorResponse('oops'),
    },
],```