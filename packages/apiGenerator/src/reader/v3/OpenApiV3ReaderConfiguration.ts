export interface OpenApiV3ReaderConfiguration {
  operations: {
    groupRef: string;
    isEnabledRef: string;
    virtualParameters?: VirtualParameter[];
  };
}

export interface VirtualParameter {
  operationId?: string;
  name: string;
  isRequired: boolean;
  nativeType: string;
  description?: string;
}
