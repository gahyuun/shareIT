import Header from './components/Header';
import { createDom } from './core/Dom';
import { routeRender } from './core/router';
import './tailwind.css';

const headerRoot = document.querySelector('.header');

createDom(new Header(headerRoot));
routeRender();

window.addEventListener('popstate', () => {
  routeRender();
});
