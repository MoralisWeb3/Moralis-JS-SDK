export interface IParseApiModule {
  path: string;
  whitelist: string[];
  className: string;
}

export type ParsedType = { name: string; type: string };

export type SDKMethodParsed = {
  path: string;
  desc?: string;
  return?: ParsedType[];
  params?: ParsedType[];
};
