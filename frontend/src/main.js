import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from "./router";
import * as _ from 'lodash';
import './utils/filters';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
import './sass/base.sass';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
