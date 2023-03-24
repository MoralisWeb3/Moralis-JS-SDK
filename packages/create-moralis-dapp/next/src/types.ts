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
