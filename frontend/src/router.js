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
    router.push({ path: '/cashvue/' });
  }
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/cashvue/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cashvue/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '/cashvue/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: checkAuth,
    },
    {
      path: '/cashvue/dashboard',
      name: 'Wallet',
      component: DashboardWallet,
      beforeEnter: checkAuth,
    },
    {
      path: '/cashvue/expenses',
      name: 'Expenses',
      component: Expenses,
      beforeEnter: checkAuth,
    },
    {
      path: '/cashvue/earnings',
      name: 'Earnings',
      component: Earnings,
      beforeEnter: checkAuth,
    },
    {
      path: '*',
      redirect: '/cashvue/',
    },
  ],
});

export default router;
