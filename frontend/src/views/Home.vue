<template>
  <div class="home__container">
      <div>
        <transition name="fade">
          <h4 
            class="welcome-header"
            v-if="authenticated">
              <p class="title">
                $
              </p>
              <p class="cashvue-title">
                Hello <span>{{ user.nickname || user.name }}</span>,
                please go to your wallet's 
                <router-link class="link" to="/dashboard"> dashboard </router-link>
                to see more...
              </p>
          </h4>
        </transition>
        <transition name="fade">
          <h4
            class="welcome-header"
            v-if="!authenticated">
            <p class="cashvue-title">
              Welcome to <span v-for="letter in appTitle.split('')">{{ letter }}</span> !
            </p>
            <p class="title">
              $
            </p>
            <p class="cashvue-subtitle">
              It's web application made to help manage home budget, powered by 
              <br />
              <a class="link" href="https://vuetifyjs.com/" target="_blank">Vuetify</a>
               and 
              <a class="link" href="https://vuejs.org/" target="_blank">Vue.js</a>.
            </p>
            <p class="title">
              $
            </p>
            <p class="cashvue-subtitle">
              Let's <a class="link" @click="auth.login()">sign up</a> and simply start controlling your expenses today!
            </p>
          </h4>
        </transition>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Logo from '../components/Logo';

export default {
  name: 'Home',
  props: ['auth'],
  components: {
    Logo,
  },
  data() {
    return {
      appTitle: 'cashVue',
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'getAuthenticated',
      user: 'getUser',
    }),
  },
  methods: {
    ...mapActions({
      getProfile: 'getUserProfile',
    }),
  },
  created() {
    if (this.authenticated) {
      this.getProfile();
    }
  },
};
</script>
