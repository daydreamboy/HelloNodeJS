import { IRouterConfig, lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Menu1 = lazy(() => import('@/pages/Menu1'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/menu1',
        exact: true,
        component: Menu1,
      },
    ],
  },
];
export default routerConfig;
