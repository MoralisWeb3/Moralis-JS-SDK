export interface IStandardCallbacks {
  onError?: (error: Error) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}
