export interface BodyParams {
  key: string;
  type: string;
  required: boolean;
}

export interface Endpoint {
  method: string;
  group: string;
  name: string;
  methodName: string;
  url: string;
  bodyParams?: BodyParams[];
  noArgs: boolean;
}
