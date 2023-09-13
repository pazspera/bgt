<template>
  <v-card class="d-grid flex-column px-3 py-3 h-100" color="white">
    <v-img :src="boardGame.image" class="mb-3 boardGame__img" cover></v-img>
    <v-card-text class="mb-2 boardGame-name">{{ boardGame.name }}</v-card-text>
    <v-btn class="btn-add align-self-end justify-self-end" color="primary">
      <v-icon icon="mdi:mdi-plus"></v-icon>
      <span>Agregar nueva partida</span>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "BoardgameCard",
  props: ["boardGame"],

  data() {
    return {
      btnText: "Agregar nueva partida",
      btnRoute: "Home",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.boardGame__img {
  max-height: 248px;
  max-width: 248px;
}

.boardGame-name {
  font-size: $size5;
}
</style>
