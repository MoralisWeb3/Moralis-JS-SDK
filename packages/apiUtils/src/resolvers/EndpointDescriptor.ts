// TODO: we need to delete this file when this interface will be not used.

export type EndpointMethod = 'get' | 'post' | 'put' | 'delete';

export interface EndpointDescriptor {
  name: string;
  urlPatternParamNames: string[];
  urlPattern: string;
  bodyParamNames: string[];
  method: EndpointMethod;
}
