<template>
  <v-toolbar class="bg-neutral-800" :elevation="0" color="primary-300">
    <v-container>
      <v-row>
        <router-link :to="{ name: 'Home' }">
          <v-app-bar-nav-icon color="primary-300"><img src="@/assets/img/logo_dark.png" /></v-app-bar-nav-icon>
        </router-link>
        <v-toolbar-title>Hello</v-toolbar-title>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "ToolBar",
};
</script>

<style></style>
