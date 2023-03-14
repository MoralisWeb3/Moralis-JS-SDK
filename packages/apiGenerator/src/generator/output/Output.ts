export interface Output {
  newLine(): void;
  write(tabs: number, content: string): void;
  toString(): string;
}
