import App from '../App';
import { createDom } from './core/Dom';
import { routeRender } from './core/router';
import './tailwind.css';

const root = document.querySelector('body');

createDom(new App(root));
routeRender();

window.addEventListener('popstate', () => {
  routeRender();
});
