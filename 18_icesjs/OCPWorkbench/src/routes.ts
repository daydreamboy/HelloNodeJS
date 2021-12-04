import { IRouterConfig, lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const Home = lazy(() => import('@/pages/Home'));
const RealtimeDebugger = lazy(() => import('@/pages/RealtimeDebugger'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
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
