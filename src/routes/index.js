import Home from '../pages/Home';
import My from '../pages/My';
import Write from '../pages/Write';

export const routes = [
  { path: '/', component: Home, authentication: false },
  { path: '/write', component: Write, authentication: true },
  { path: '/my', component: My, authentication: true },
];
