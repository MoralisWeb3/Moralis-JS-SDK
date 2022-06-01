import type Parse from 'parse';

interface HandleLogoutOptions {
  server: typeof Parse;
}

export const handleLogout = async ({ server }: HandleLogoutOptions) => {
  const user = await server.User.logOut();

  if (user) {
    // Note this function exists but not exported as type as it is a private function
    // We need to make sure to clear the local saved server data to avoid reading user data
    // from the cache after logout
    // TODO: fix: this is not availalbe after signup?
    try {
      (user as Parse.User & { _clearServerData: () => void })._clearServerData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('cannot clear serverdata', error.message);
    }
  }
};
