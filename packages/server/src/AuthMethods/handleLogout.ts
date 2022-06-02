import type Parse from 'parse';

interface HandleLogoutOptions {
  server: typeof Parse;
}

export const handleLogout = async ({ server }: HandleLogoutOptions) => {
  const currentUser = await server.User.currentAsync();

  // Clear server cache
  try {
    if (currentUser) {
      (currentUser as Parse.User & { _clearServerData: () => void })._clearServerData();
    }
  } catch (error) {
    // Do nothing, might server data might not be available
  }

  await server.User.logOut();
};
