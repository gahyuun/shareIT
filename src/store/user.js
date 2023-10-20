import { auth } from '../apis/firebase';
import { Store } from '../core/store';

export const userStore = new Store({ user: 'loading' });
auth.onAuthStateChanged((userInfo) => {
  if (userInfo) {
    userStore.state.user = auth.currentUser;
    return;
  }
  userStore.state.user = '';
});
