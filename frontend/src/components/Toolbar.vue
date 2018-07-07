<template>
  <v-toolbar class="toolbar" app fixed>
    <v-icon class="toolbar__icon" @click="toggleDrawer">
      fas fa-list
    </v-icon>
    <v-toolbar-title>
      CashVue
    </v-toolbar-title>
    <v-spacer>
    </v-spacer>
  </v-toolbar>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Toolbar',
    props: ['items'],
    methods: {
      ...mapActions({
        toggleDrawer: 'toggleDrawer'
      })
    }
  }
</script>

<style lang="sass" scoped>
  .toolbar__icon
    cursor: pointer
    &:hover
      color: white
</style>

