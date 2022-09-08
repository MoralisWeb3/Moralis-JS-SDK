export interface IParseApiModule {
  path: string;
  whitelist: string[];
  className: string;
}

export type TParsedType = { name: string; type: string };

export type TSDKMethodParsed = {
  path: string;
  return?: TParsedType[];
  params?: TParsedType[];
};
