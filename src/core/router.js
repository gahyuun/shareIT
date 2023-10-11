import { routes } from '../routes';
import { createDom } from './Dom';

export function routeRender() {
  if (!location.pathname) {
    history.replaceState(null, '', '/');
  }
  const root = document.querySelector('router-view');

  const currentRoute = routes.find((route) => {
    return new RegExp(route.path + '/?$').test(location.pathname);
  });

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
