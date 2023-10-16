import Swal from 'sweetalert2';
import { routes } from '../routes';
import { userStore } from '../store/user';
import { createDom } from './Dom';

const checkAuthentication = (currentRoute) => {
  if (currentRoute.authentication && !userStore.state.user) {
    return false;
  }
  return true;
};

const redirectHome = () => {
  Swal.fire('로그인 후 이용하실 수 있습니다');
  navigate('/');
};
export function routeRender() {
  if (!location.pathname) {
    history.replaceState(null, '', '/');
  }
  const root = document.querySelector('router-view');

  const currentRoute = routes.find((route) => {
    return new RegExp(route.path + '/?$').test(location.pathname);
  });

  if (!checkAuthentication(currentRoute)) {
    redirectHome();
    return;
  }

  createDom(new currentRoute.component(root));
  window.scrollTo(0, 0);
}

export const getUrlParam = () => {
  const [id, value] = location.search.slice(1).split('=');
  return value;
};

export const navigate = (url = '/') => {
  window.history.pushState(null, '', url);
  routeRender();
};
