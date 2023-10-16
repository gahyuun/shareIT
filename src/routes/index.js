import Home from '../pages/Home';
import Write from '../pages/Write';

export const routes = [
  { path: '/', component: Home, authentication: false },
  { path: '/write', component: Write, authentication: true },
];
