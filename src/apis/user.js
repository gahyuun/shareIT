import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { navigate } from '../core/router';
import { ROUTES } from '../constants/routes';

export const logout = async () => {
  await signOut(auth);
  navigate(ROUTES.HOME);
};
