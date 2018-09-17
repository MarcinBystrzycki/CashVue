<template>
  <v-toolbar class="toolbar" app fixed>
    <v-icon
      color="white"
      class="toolbar__icon"
      @click="toggleDrawer">
      fas fa-list
    </v-icon>
    <v-toolbar-title class="toolbar__title">
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Toolbar',
  props: ['items'],
  methods: {
    ...mapActions({
      toggleDrawer: 'toggleDrawer',
    }),
  },
};
</script>
