<template>
  <div class="container add-player">
    <div class="row">
      <div class="col">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="newPlayerName" class="form-control" required />
          </div>
          <!-- <p v-if="error">{{ error }}</p> -->
          <button type="submit" class="btn btn__primary">Agregar jugador</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "AddPlayerView",
  /* data() {
    return {
      newPlayerName: "",
      players: [],
      error: "",
    };
  }, */
  mounted() {
    document.title = "Agregar Jugador - Board Game Tracker";
  },
  setup() {
    const playerStore = usePlayerStore();
    const newPlayerName = ref("");
    const router = useRouter();
    const route = useRoute();

    const capitalizeString = (string) => {
      let arrayOfWords = string.split(/[\s,\t,\n]+/);
      let capitalizedString;

      let capitalizeWord = (string) => {
        let firstLetter = string[0].toUpperCase();
        let rest = string.slice(1).toLowerCase();
        return firstLetter + rest;
      };

      capitalizedString = arrayOfWords.map(capitalizeWord).join(" ");

      return capitalizedString;
    };

    const handleSubmit = () => {
      // capitalize all names to make sure there
      // are no duplicates

      let capitalizedName = capitalizeString(newPlayerName.value);

      // checks if there is a value on the input
      // also use 
      if (newPlayerName.value.length > 0) {
        playerStore.addPlayer({
          name: capitalizedName,
        });

        router.push({ name: "Players" });
      }
    };

    return { playerStore, newPlayerName, handleSubmit, capitalizeString, router, route };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.add-player {
  min-height: 50vh;
}
</style>
