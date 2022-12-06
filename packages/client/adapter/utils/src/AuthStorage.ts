const prefix = 'moralisAuth-';

export class AuthStorage {
  public set(key: string, value: string): void {
    window.localStorage[prefix + key] = value;
  }

  public get(key: string): string | undefined {
    return window.localStorage[prefix + key];
  }

  public remove(key: string) {
    window.localStorage.removeItem(prefix + key);
  }
}
