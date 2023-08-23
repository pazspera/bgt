<template>
  <router-link :to="{ name: 'Games' }">
    <v-btn class="btn-add" color="primary"> <v-icon icon="mdi:mdi-plus" /> <span>Agregar partida</span> </v-btn>
  </router-link>
</template>

<script>
export default {
  name: "AddGameButton",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.btn-add {
  position: fixed;
  bottom: 70px;
  right: 3vw;
}
</style>
