import App from '../App';
import { createDom } from './core/Dom';
import { routeRender } from './core/router';

const root = document.querySelector('#root');

createDom(new App(root));
routeRender();

window.addEventListener('popstate', () => {
  routeRender();
});
