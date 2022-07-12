export interface IDefaultCallbacks {
  onError?: (error: Error) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}
