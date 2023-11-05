import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { navigate } from '../core/router';
import { ROUTES } from '../constants/routes';

export const logout = async () => {
  await signOut(auth);
  navigate(ROUTES.HOME);
  localStorage.removeItem('userInfo');
};

export const login = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid }));
};
