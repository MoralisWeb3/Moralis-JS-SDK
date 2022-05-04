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
    (user as Parse.User & { _clearServerData: () => void })._clearServerData();
  }
};
