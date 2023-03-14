import { createRouter, createWebHashHistory } from 'vue-router';
import ViewNotes from '@/views/ViewNotes';
import ViewEditNote from '@/views/ViewEditNote';
import ViewStats from '@/views/ViewStats';
import ViewAuth from '@/views/ViewAuth';
import ViewPageNotFound from '@/views/ViewPageNotFound';
import { useStoreAuth } from '@/stores/storeAuth';

let storeAuth;

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  },
  {
    path: '/:catchAll(.*)',
    name: 'page-not-found',
    component: ViewPageNotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async to => {
  storeAuth = useStoreAuth();

  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (storeAuth.user.id && to.name === 'auth') {
    return false;
  }
});

export default router;
