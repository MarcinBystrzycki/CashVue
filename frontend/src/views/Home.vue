<template>
  <div>
  	<img src="../assets/logo.png">
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    props: ['auth'],
    computed: {
      ...mapGetters({
        authenticated: 'getAuthenticated'
      })
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

