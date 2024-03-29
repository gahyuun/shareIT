import Swal from 'sweetalert2';
import { routes } from '../routes';
import { createDom } from './Dom';
import NotFound from '../components/NotFound';

const checkAuthentication = (currentRoute) => {
  if (currentRoute.authentication && !localStorage.getItem('userInfo')) {
    return false;
  }
  return true;
};

const redirectHome = () => {
  Swal.fire('로그인 후 이용하실 수 있습니다');
  navigate('/');
};

let routePath = '';

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

export function routeRender() {
  const root = document.querySelector('router-view');

  const currentRoute = routes.find((route) => {
    routePath = route.path;
    return location.pathname.match(pathToRegex(route.path));
  });

  if (!currentRoute) {
    createDom(new NotFound(root));
    window.scrollTo(0, 0);
    return;
  } // 일치하는 경로가 없을 때 404 처리

  if (!checkAuthentication(currentRoute)) {
    redirectHome();
    return;
  }

  createDom(new currentRoute.component(root));
  window.scrollTo(0, 0);
}

export const getUrlParam = () => {
  const result = location.pathname.match(pathToRegex(routePath));
  const values = result.slice(1);
  const keys = Array.from(routePath.matchAll(/:(\w+)/g)).map(
    (result) => result[1],
  );
  return Object.fromEntries(
    keys.map((key, index) => {
      return [key, values[index]];
    }),
  );
};

export const navigate = (url = '/') => {
  window.history.pushState(null, '', url);
  routeRender();
};
