<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
  <v-app :full-height="true">
    <v-app-bar>
      <v-app-bar-title class="d-flex">
        <router-link to="/" title="Home">
          <v-icon icon="mdi-fire-circle" color="primary" size="x-large"></v-icon>
        </router-link>
        <span class="ml-4">Hell Form</span>
      </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <v-main>
        <RouterView />
      </v-main>
    </v-container>
  </v-app>
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
  margin: 2px;
}
.v-container {
  max-width: 1200px;
}

:deep(.v-toolbar-title__placeholder) {
  display: flex;
  align-items: center;
}
</style>
<style lang="scss">
.with-gap {
  gap: 1rem;
}
</style>
