import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from './vuex/store';
import Callback from "./components/Callback.vue";
import Profile from "./views/Profile.vue";
import DashboardWallet from "./views/DashboardWallet.vue";

Vue.use(Router);

const checkAuth = (to, from, next) => {
  if (store.getters['getAuthenticated']) {
    next();
  } else {
    router.push({ path: '/' })
  }
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/callback",
      name: "Callback",
      component: Callback
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      // beforeEnter: checkAuth
    },
    {
      path: "/wallet",
      name: "Wallet",
      component: DashboardWallet,
      // beforeEnter: checkAuth
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;