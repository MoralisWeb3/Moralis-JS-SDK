export interface Plugin {
  id: string;
  files: {
    /** Extending of _app component */
    _app: {
      imports: string;
      config: string;
      connectWallet?: string;
      wrappers: [{ name: string; props?: { name: string; value: string }[] }];
    };
    /**  Whole Example Component */
    example?: string;
  };
  dependencies: string[];
}

export type AppWrapper = { name: string; props?: { name: string; value: string }[] };
export interface ModuleConfig {
  name: string;
  dependencies?: string[];
  template: string;
  _app: {
    imports: string;
    configs?: string;
    wrappers?: AppWrapper[];
  };
}

export interface StylingSystemConfig extends ModuleConfig {}
export interface Web3LibraryConfig extends ModuleConfig {}
