import 'next-auth';
import { TUserData } from './pages/api/auth/[...nextauth]';

declare module 'next-auth' {
  interface User extends TUserData {}

  interface Session {
    user: User;
  }
}
