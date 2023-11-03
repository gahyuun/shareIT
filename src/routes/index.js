import { ROUTES } from '../constants/routes';
import Detail from '../pages/Detail';
import Edit from '../pages/Edit';
import Home from '../pages/Home';
import My from '../pages/My';
import Write from '../pages/Write';

export const routes = [
  { path: ROUTES.HOME, component: Home, authentication: false },
  { path: ROUTES.WRITE, component: Write, authentication: true },
  { path: ROUTES.MY, component: My, authentication: true },
  { path: `${ROUTES.DETAIL}/:id`, component: Detail, authentication: false },
  { path: ROUTES.EDIT, component: Edit, authentication: false },
];
