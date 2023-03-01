export interface AppGenerator {
  name: string;
  generate(): Promise<void>;
}
