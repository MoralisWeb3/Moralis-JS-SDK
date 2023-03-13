export function validateParams<Params>(params: Partial<Params>, requiredParams: (keyof Params)[]): Params {
  const undefinedParams = requiredParams.filter((key) => typeof params[key] === 'undefined');

  if (undefinedParams.length > 0) {
    throw new Error(`The following required parameters are undefined: ${undefinedParams.join(', ')}`);
  }

  return params as Params;
}
