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
                <v-select v-model="selectedPlayers" :items="playersForSelect.value" item-title="Name" item-value="Id" chips multiple label="Selecciona los jugadores"> </v-select>
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

    // List of fetched players to show on the select
    const playersForSelect = reactive([]);

    // NEXT!!
    // Gotta save an array of ids on newGameForm.playerIdsList
    // 1. Am I getting back a list of objects from the select?
    // 2. Maybe a forEach and push the id to an array?
    const selectedPlayers = ref([]);

    // Form to add the new game
    const newGameForm = reactive({
      startDate: gameDate,
      boardGameId: "",
      playerIdsList: selectedPlayers,
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
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      }

      // THE FETCH TO REVIEW
      try {
        const fetchedPlayers = await playerStore.getPlayers();
        console.log(fetchedPlayers);

        playersForSelect.value = fetchedPlayers;
      } catch (err) {
        console.log("Error fetching all players: " + err);
      }

      // showForm should go to true only when all
      // the fetched info is loaded in the corresponding places
      if (boardGame.value && playersForSelect.value) {
        console.log("shifting to true");
        showForm.value = true;
        console.log(playersForSelect.value);
      }

      watch(showForm, (newValue) => {
        console.log("showForm value changed: ", newValue);
      });

      // This watch shows the changes made to newGameForm
      // which is binded to the form and will be pushed
      // as a new game
      watch(newGameForm, (newValue) => {
        console.log("change in newGameForm", newValue);
        console.log("startDate", newGameForm.startDate);
        console.log("boardGameId", newGameForm.boardGameId);
        console.log("playerIdsList", newGameForm.playerIdsList);
        console.log("winnerPlayerId", newGameForm.winnerPlayerId);
        console.log("description", newGameForm.description);

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

    return { newGameForm, boardGame, showForm, boardGameName, gameDate, playerStore, playersForSelect, selectedPlayers };
  },
};
</script>

<style></style>
