import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import store from './vuex/store';
import Callback from './components/Callback';
import Profile from './views/Profile';
import DashboardWallet from './views/DashboardWallet';
import Expenses from './views/Expenses';
import Earnings from './views/Earnings';

Vue.use(Router);

const checkAuth = (to, from, next) => {
  if (store.getters.getAuthenticated) {
    next();
  } else {
    router.push({ path: '/' });
  }
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: checkAuth,
    },
    {
      path: '/dashboard',
      name: 'Wallet',
      component: DashboardWallet,
      beforeEnter: checkAuth,
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      beforeEnter: checkAuth,
    },
    {
      path: '/earnings',
      name: 'Earnings',
      component: Earnings,
      beforeEnter: checkAuth,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
