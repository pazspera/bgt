<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <div class="container my-4">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <form @submit.prevent="editPlayer">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="playerStore.player.Name" class="form-control" required />
          </div>
          <v-btn type="submit" class="btn me-3" color="primary">Editar jugadorx</v-btn>
          <v-btn variant="text" @click="router.go(-1)">Cancelar</v-btn>
        </form>
      </div>
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-4">
        <div v-if="areThereErrors" class="alert alert-warning" role="alert">
          <p class="mb-0">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { usePlayerStore } from "@/stores/PlayerStore";
import { useRoute, useRouter } from "vue-router";
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "EditPlayerView",
  mounted() {
    document.title = "Editar Jugador - Board Game Tracker";
  },
  components: { HeroSection },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const playerStore = usePlayerStore();
    const router = useRouter();
    const route = useRoute();
    const newPlayerName = ref("");
    let error = ref("");
    let areThereErrors = ref(false);

    let heroTitle = "Editar jugadorx";
    let bgClass = "playersBg";

    /* const playerId = ref(props.Id);
    console.log("props", props.value);

    console.log(playerId); */

    onMounted(async () => {
      await playerStore.getPlayer(props.id);
      console.log(route.query.value);
    });

    // I have this function on the PlayerStore but
    // it doesn't work. So we're copying it wherever
    // we need it and refactor later
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

    const editPlayer = () => {
      // Capitalize the new name
      // Check if it already exists on the PlayerStore
      //    If it exists, show an error
      //    If it doesn't exist, send the patch request and change route to player list

      let newName = capitalizeString(playerStore.player.Name);

      if (playerStore.checkIfPlayerAlreadyExists(newName)) {
        // When the function starts, putting this value in false
        // means the error message dissappears if the user
        // had already entered a name that was in the PlayerStore
        areThereErrors.value = false;
        error.value = `Ya existe unx jugador con el nombre "${newName}". ¡Elige otro nombre!`;

        areThereErrors.value = true;
      } else {
        areThereErrors.value = false;
        playerStore.updatePlayer(playerStore.player, newName);

        // This tries to update all the players before
        // changing view, it doesn't change the player list after
        // the update on the player
        playerStore.getPlayers();

        router.push({ name: "Players" });
      }
    };

    return { newPlayerName, playerStore, name, capitalizeString, editPlayer, areThereErrors, error, router, route, heroTitle, bgClass };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
