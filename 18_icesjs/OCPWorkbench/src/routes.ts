import { IRouterConfig, lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const RealtimeDebugger = lazy(() => import('@/pages/RealtimeDebugger'));

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
        path: '/realtimeDebugger',
        exact: true,
        component: RealtimeDebugger,
      },
    ],
  },
];
export default routerConfig;
