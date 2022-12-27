import { Core, CoreProvider } from '@moralisweb3/common-core';
import { Auth } from './Auth';
import { BackendAdapter } from './BackendAdapter';

export class AuthProvider {
  public static create(backendAdapter: BackendAdapter, core?: Core): AuthProvider {
    return new AuthProvider(backendAdapter, core ?? CoreProvider.getDefault());
  }

  private auth: Auth | null = null;

  private resolvers: {
    resolve(auth: Auth): void;
    reject(reason?: unknown): void;
  }[] = [];

  public constructor(private readonly backendAdapter: BackendAdapter, private readonly core: Core) {}

  public get(): Promise<Auth> {
    if (this.auth) {
      return Promise.resolve(this.auth);
    }

    return new Promise((resolve, reject) => {
      const isFirst = this.resolvers.length === 0;
      this.resolvers.push({ resolve, reject });

      if (isFirst) {
        this.backendAdapter.createAuth(this.core).then(
          (auth) => {
            this.auth = auth;

            const { resolvers } = this;
            this.resolvers = [];
            resolvers.forEach((resolver) => resolver.resolve(auth));
          },
          (reason) => {
            const { resolvers } = this;
            this.resolvers = [];
            resolvers.forEach((resolver) => resolver.reject(reason));
          },
        );
      }
    });
  }
}
