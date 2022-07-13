export interface IDefaultCallbacks<TOnSuccessData> {
  onError?: (error: Error) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  onSuccess?: (data?: TOnSuccessData) => void;
}
