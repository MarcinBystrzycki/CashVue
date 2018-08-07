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
        class="container container__main">
        <router-view
          :auth="auth" 
          :authenticated="authenticated">
        </router-view>
      </v-container>
    </v-content>
    <v-footer class="footer" app>
    </v-footer>
  </v-app>
</template>

<script>
  import AuthService from './auth/AuthService'
  import Navigation from './components/Navigation'
  import Toolbar from './components/Toolbar'
  import store from './vuex/store'
  import { mapGetters, mapActions } from 'vuex'
  import jwt from 'jsonwebtoken'

  const auth = new AuthService()

  const { login, logout, authenticated, authNotifier } = auth

  export default {
    name: 'app',
    components: {
      Navigation,
      Toolbar
    },
    data () {
      authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
        this.setAuthenticated(authState.authenticated)
      })
      return {
        auth,
        authenticated,
        drawer: true,
      }
    },
    methods: {
      login,
      logout,
      ...mapActions({
        setAuthenticated: 'setAuthenticated',
      }),
    },
    mounted() {
      this.setAuthenticated(this.authenticated)
    },
    store
  }
</script>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  display: flex
  .toolbar,
  .footer
    background-color: #41b883
.container__main
  height: calc(100vh - 100px)
.btn
  padding: 0
  border-radius: 5px
</style>
