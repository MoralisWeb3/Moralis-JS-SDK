import { Logger } from '@moralisweb3/core';
import type Parse from 'parse';

interface HandleLogoutOptions {
  server: typeof Parse;
  logger: Logger;
}

export const handleLogout = async ({ server, logger }: HandleLogoutOptions) => {
  const currentUser = await server.User.currentAsync();

  // Clear server cache
  try {
    if (currentUser) {
      (currentUser as Parse.User & { _clearServerData: () => void })._clearServerData();
    }
  } catch (error) {
    logger.warn('Failed to clear locally stored serverData');
  }

  await server.User.logOut();
};
