<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <form @submit.prevent="editPlayer">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="playerStore.player.name" class="form-control" required />
            <p>name: {{ playerStore.player.name }}</p>
            <p>does the player have a name: {{ playerStore.playerLoaded }}</p>
          </div>
          <button type="submit" class="btn btn__primary">Editar jugador</button>
        </form>
      </div>
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-4">
        <div v-if="areThereErrors" class="alert alert-warning" role="alert">
          <p class="mb-0">_Hello</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { usePlayerStore } from "@/stores/PlayerStore";
export default {
  name: "EditPlayerView",
  mounted() {
    document.title = "Editar Jugador - Board Game Tracker";
  },
  props: ["id"],
  setup(props) {
    const playerStore = usePlayerStore();
    const newPlayerName = ref("");
    let error = ref("go");
    let areThereErrors = false;

    onMounted(async () => {
      await playerStore.getPlayer(props.id);
    });

    // I have this function on the PlayerStore but
    // it doesn't work. So we're copying it wherever
    // we need it and refactor later
    const capitalizeString = (string) => {
      let arrayOfWords = string.split(/[\s,\t,\n]+/);
      console.log("array of words: ", arrayOfWords);

      let capitalizedString;

      let capitalizeWord = (string) => {
        let firstLetter = string[0].toUpperCase();
        let rest = string.slice(1).toLowerCase();
        return firstLetter + rest;
      };

      capitalizedString = arrayOfWords.map(capitalizeWord).join(" ");
      console.log("capitalizedString ", capitalizedString);

      return capitalizedString;
    };

    const editPlayer = () => {
      // Capitalize the new name
      // Check if it already exists on the PlayerStore
      //    If it exists, show an error
      //    If it doesn't exist, send the patch request and change route to player list

      let newName = capitalizeString(playerStore.player.name);

      if (playerStore.checkIfPlayerAlreadyExists(newName)) {
        console.log(`The player ${newName} already exists`);
        error.value = `Ya existe une jugador con el nombre "${newName}". ¡Elige otro nombre!`;

        // LOOK INTO HOW TO UPDATE A BOOLEAN VALUE
        // WITH THE COMPOSITION API
        areThereErrors.value = true;
      } else {
        console.log(`The player ${newName} doesn't exist`);
      }

      console.log(newName);
    };

    /* const testCapitalize = () => {

      let newName = playerStore.capitalizeName(playerStore.name);
      // capitalizeString(playerStore.name);
      console.log("newName ", newName)


    }; */

    return { newPlayerName, playerStore, name, capitalizeString, editPlayer, areThereErrors };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
