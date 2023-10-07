<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="my-5">
    <v-row v-if="showForm">
      <v-col cols="12" lg="8" offset-lg="2">
        <h2>Jugamos: {{ boardGameName }}</h2>
      </v-col>

      <v-col cols="12" lg="8" offset-lg="2">
        <v-form>
          <v-container>
            <!-- Date -->
            <v-row>
              <v-col>
                <VueDatePicker v-model="gameDate" auto-apply :enable-time-picker="false"></VueDatePicker>
              </v-col>
            </v-row>
            <!-- Players -->
            <v-row>
              <v-col>
                <v-select :items="playersForSelect" item-title="name" item-value="id" chips multiple label="Selecciona los jugadores"> </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>

    <!-- Loading Spinner -->
    <v-row v-if="!showForm">
      <v-col cols="12" lg="8" offset-lg="2">
        <LoadingSpinner />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useGameStore } from "@/stores/GameStore";
import { usePlayerStore } from "@/stores/PlayerStore";
import HeroSection from "@/components/HeroSection.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import VueDatePicker from "@vuepic/vue-datepicker";

export default {
  name: "AddGame",
  components: { HeroSection, LoadingSpinner, VueDatePicker },
  data() {
    return {
      heroTitle: "Agregar nueva partida",
      bgClass: "gamesBg",
    };
  },
  mounted() {
    document.title = "Agregar Partida - Board Game Tracker";
  },
  setup() {
    const boardGameStore = useBoardGameStore();
    const playerStore = usePlayerStore();
    const gameStore = useGameStore();
    // The computed here keeps a sync copy of the value
    // of selectedBoardGameId
    const selectedBoardGameId = computed(() => gameStore.selectedBoardGameId);
    // This object is going to hold the boardgame
    const boardGame = ref(null);
    // This variable is gonna be false by default. Once
    // boardGame.value exists, it changes to true to show
    // the form
    const showForm = ref(false);

    // REVIEW THE DATE FORMAT TO MAKE SURE IT MATCHES THE API
    const gameDate = ref(new Date());

    // Player select
    // 1. Fetch all players from store
    // 2. Loop over the store directly in the select
    // The issue is getting the data from the store
    // can't use a v-for to loop them
    // Maybe creating a ref to do it locally on this view
    const playersForSelect = reactive([]);

    // Form to add the new game
    const newGameForm = reactive({
      startDate: gameDate,
      boardGameId: "",
      playerIdsList: [],
      winnerPlayerId: "",
      description: "",
    });

    // Saving the boardgame name on a variable
    // to use v-model and show it on the Juego input
    const boardGameName = ref(null);

    onBeforeMount(async () => {
      try {
        // Have to do all async here, then change show.form to true
        // so all the info is loaded before showing the template

        // Fetching boardgame
        boardGame.value = await boardGameStore.getBoardgame(selectedBoardGameId.value);

        if (boardGame.value) {
          /* console.log("BoardGame: " + boardGame.value.name);
          console.log(showForm.value); */
          showForm.value = true;
          /* console.log(showForm.value); */
        }
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      }

      // THE FETCH TO REVIEW
      try {
        const fetchedPlayers = await playerStore.getPlayers();
        console.log(fetchedPlayers);

        playersForSelect.value = fetchedPlayers.map((player) => ({
          name: player.name,
          id: player.id,
        }));

        console.log("playersForSelect" + JSON.stringify(playersForSelect.value));

        /* playersForSelect.splice(0, playersForSelect.length, ...fetchedPlayers); */

        // playersForSelect is an object if I assign it directly
        // gotta make sure it's an array and push all objects in it
        if (playersForSelect.length > 0) {
          console.log("Players for select:", playersForSelect);
          console.log("typeof players for select:", typeof playersForSelect);
        }
        /* if (playersForSelect.value) {
          console.log("Players for select: " + playersForSelect.value);
          console.log("typeof players for select:" + typeof playersForSelect);
        } */
      } catch (err) {
        console.err("Error fetching all players: " + err);
      }

      watch(showForm, (newValue) => {
        console.log("showForm value changed: ", newValue);
      });

      // Asign the value of the boardGameId that's
      // coming from the boardGameCard to
      // newGameForm once it's been fetched
      newGameForm.boardGameId = selectedBoardGameId.value;

      // Asign boardgame name to show it on input
      boardGameName.value = boardGame.value.name;

      // Asign boardGameId to newGameForm once it's loaded
      newGameForm.boardGameId = boardGame.value.id;
    });

    return { newGameForm, boardGame, showForm, boardGameName, gameDate, playerStore, playersForSelect };
  },
};
</script>

<style></style>
