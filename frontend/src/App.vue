<template>
  <v-app id="app">
    <navigation
      :authenticated="authenticated"
      @login="login()"
      @logout="logout()"
      :drawer="drawer">
    </navigation>
    <toolbar
      @drawerToggle="drawer = !drawer"/>
    <v-content>
      <v-container
        fluid
        class="container container__main p-2">
        <transition name="fade">
          <router-view
            :auth="auth"
            :authenticated="authenticated">
          </router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer
      class="footer__container"
      app>
      <v-card
        flat
        tile />
        <v-card-text class="footer__footer-text ml-4 white--text">
          &copy;2018 — 
          <a
            class="portfolio-link"
            href="https://mbystrzycki.pl"
            target="_blank">
            <strong class="mr-1">
              mbystrzycki
            </strong>
          </a>
        </v-card-text>
        <template v-for="(icon, index) in icons">
          <v-btn
            class="btn__social ml-0 mr-0 white--text"
            :key="index"
            icon>
            <v-icon size="16">
              {{ icon }}
            </v-icon>
          </v-btn>
        </template>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import AuthService from './auth/AuthService';
import Navigation from './components/Navigation';
import Toolbar from './components/Toolbar';
import store from './vuex/store';

const auth = new AuthService();

const {
  login, logout, authenticated, authNotifier,
} = auth;

export default {
  name: 'app',
  components: {
    Navigation,
    Toolbar,
  },
  data() {
    authNotifier.on('authChange', (authState) => {
      this.authenticated = authState.authenticated;
      this.setAuthenticated(authState.authenticated);
    });
    return {
      auth,
      authenticated,
      drawer: true,
      icons: ['alternate_email'],
    };
  },
  methods: {
    login,
    logout,
    ...mapActions({
      setAuthenticated: 'setAuthenticated',
    }),
  },
  mounted() {
    this.setAuthenticated(this.authenticated);
  },
  store,
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
