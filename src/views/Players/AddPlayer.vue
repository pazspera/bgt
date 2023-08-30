<template>
  <div class="container add-player">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="newPlayerName" class="form-control" required />
          </div>
          <button type="submit" class="btn btn__primary">Agregar jugador</button>
        </form>
      </div>
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-4">
        <div v-if="error" class="alert alert-warning" role="alert">
          <p class="mb-0">{{ error }}</p>
        </div>
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
  mounted() {
    document.title = "Agregar Jugador - Board Game Tracker";
  },
  setup() {
    const playerStore = usePlayerStore();
    const newPlayerName = ref("");
    const router = useRouter();
    const route = useRoute();
    let error = ref("");
    let areThereErrors = ref(false);

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
      console.log("capitalizedName", capitalizedName);

      // also use checkIfPlayerAlreadyExists() to see if the player name
      // already exists (returns true if it exists)

      if (playerStore.checkIfPlayerAlreadyExists(capitalizedName)) {
        console.log("it is true, so the capitalizedName is in playerstore");
      } else {
        console.log("capitalized name is not on the playerStore");
      }

      if (playerStore.checkIfPlayerAlreadyExists(capitalizedName)) {
        // When true, capitalizedName is already in players

        // First put errors to false in case the user is
        // double checking a name that got true before
        areThereErrors.value = false;
        error.value = `Ya existe unx jugadorx con el nombre "${capitalizedName}". ¡Elige otro nombre!`;
        areThereErrors.value = true;

        // Delete newPlayerName so the user can add new name
        newPlayerName.value = "";
      } else {
        // When false, capitalizedName can be added to players
        playerStore.addPlayer({
          name: capitalizedName,
        });

        playerStore.getPlayers();
        router.push({ name: "PlayersList" });
      }

      // ORIGINAL CODE
      /* if (playerStore.checkIfPlayerAlreadyExists(capitalizedName)) {
        // player already exists
        // areThereErrors.value = false;
        error.value = `Ya existe unx jugador con el nombre "${capitalizedName}". ¡Elige otro nombre!`;
        console.log("player already exists");
        // areThereErrors.value = true;
        newPlayerName.value = "";
      } else {
        console.log("player doesn't exist");
        playerStore.addPlayer({
          name: capitalizedName,
        });

        playerStore.getPlayers();

        // router.push({ name: "Players" });
      }  */
    };

    return { playerStore, newPlayerName, handleSubmit, capitalizeString, router, route, error };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.add-player {
  min-height: 50vh;
}
</style>
