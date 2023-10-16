import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { navigate } from '../core/router';

export const logout = async () => {
  await signOut(auth);
  navigate('/');
};
