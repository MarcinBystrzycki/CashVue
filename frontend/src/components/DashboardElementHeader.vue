<template>
  <v-card-title class="dashboard__element-header">
    <h6 class="header-title">
      {{ title }}
    </h6>
    <v-spacer></v-spacer>
    <slot></slot>
    <v-spacer></v-spacer>
  </v-card-title>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
};
</script>
