<template>
  <v-navigation-drawer app id="nav" :value="drawer" fixed>
    <v-list dense class="navigation_list">
      <router-link to="/">
        <v-list-tile class="navigation__elem">
          <v-list-tile-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              home
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <router-link to="/wallet">
        <v-list-tile class="navigation__elem" v-if="authenticated">
          <v-list-tile-action>
            <v-icon>fas fa-wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              wallet
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <router-link to="/profile">
        <v-list-tile class="navigation__elem" v-if="authenticated">
          <v-list-tile-action>
            <v-icon>fas fa-users-cog</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              profile
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <a href="#"
        @click="login"
        v-if="!authenticated">
        <v-list-tile class="navigation__elem log in">
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              log in
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </a>
      <a href="#"
        @click="logout"
        v-if="authenticated">
        <v-list-tile class="navigation__elem log out">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              log out
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </a>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navigation',
    computed: {
      ...mapGetters({
        drawer: 'getDrawer',
        authenticated: 'getAuthenticated'
      })
    },
    methods: {
      login () {
        this.$emit('login')
      },
      logout () {
        this.$emit('logout')
      },
    }
  }
</script>

<style lang="sass" scoped>
#nav
  height: 100vh
  .navigation_list
    list-style-type: none
    padding: 0
    height: 100%
    display: flex
    flex-direction: column
    position: relative
    i
      font-size: 1.5em
  a
    font-weight: bold
    color: #2c3e50
    font-size: 1.5em
    &.router-link-exact-active
      color: #41b883
    &:hover
      text-decoration: none
      color: #41b883
  .navigation__elem
    margin: 0.5em
    .log
      position: relative
      bottom: 0
</style>