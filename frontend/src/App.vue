<template>
  <div id="app">
    <nav id="nav">
      <span>
        <router-link to="/">
          Home
        </router-link>
         |
      </span>
      <span v-if="authenticated">
        <router-link to="/profile">
         Profile
        </router-link>
         |
      </span>
      <span v-if="!authenticated">
        <a href="#"
          @click="login()">
            Log In
        </a>  
      </span>
      <span v-if="authenticated">
        <a href="#"
          @click="logout()">
            Log Out
        </a>
      </span>
    </nav>
    <div class="container">
      <router-view
        :auth="auth" 
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
  import AuthService from './auth/AuthService'

  const auth = new AuthService()

  const { login, logout, authenticated, authNotifier } = auth

  export default {
    name: 'app',
    data () {
      authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        auth,
        authenticated
      }
    },
    methods: {
      login,
      logout
    }
  }  
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
