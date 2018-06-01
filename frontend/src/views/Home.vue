<template>
  <div>
  	<img src="../assets/logo.png">
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
    <LoginPage />
  </div>
</template>

<script>
  import LoginPage from "@/components/LoginPage.vue";

  export default {
    name: 'Home',
    props: ['auth', 'authenticated'],
	components: {
	  LoginPage
	}
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

