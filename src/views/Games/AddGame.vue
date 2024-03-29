<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="my-5">
    <v-row v-if="showForm">
      <v-col cols="12" lg="8" offset-lg="2">
        <h2>Jugamos: {{ boardGameName }}</h2>
      </v-col>

      <v-col cols="12" lg="8" offset-lg="2">
        <v-form @submit.prevent="submitGame">
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
                <SelectPlayers />
              </v-col>
            </v-row>
            <!-- Select Winner -->
            <v-row>
              <v-col>
                <Select-winner />
              </v-col>
            </v-row>
            <!-- Notes -->
            <v-row>
              <v-col>
                <v-textarea label="Notas" v-model="newGameForm.description" color="primary"></v-textarea>
              </v-col>
            </v-row>
            <!-- Btn -->
            <v-row>
              <v-col>
                <v-btn type="submit" color="primary">Guardar partida</v-btn>
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
import SelectPlayers from "@/components/Games/SelectPlayers.vue";
import SelectWinner from "@/components/Games/SelectWinner.vue";

export default {
  name: "AddGame",
  components: { HeroSection, LoadingSpinner, VueDatePicker, SelectPlayers, SelectWinner },
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
    // Ref with the selected players that passes to the form
    const selectedPlayers = ref([]);
    const enableWinnerSelect = computed(() => selectedPlayers.value.length < 1);

    const selectWinnerFromThesePlayers = reactive([]);

    // NEXT
    // El select para seleccionar partida debería tener solamente
    // los jugadores que fueron seleccionados
    // Cada vez que se agregue un jugador, fetchearlo individualemnte
    // para agregarlo al segundo select
    // Por default, que esté disabled hasta que se elijan lxs jugadores

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

    const submitGame = () => {
      console.log("Submitting the form!!");
      console.log("startDate", newGameForm.startDate);
      console.log("boardGameId", newGameForm.boardGameId);
      console.log("playerIdsList", newGameForm.playerIdsList);
      console.log("winnerPlayerId", newGameForm.winnerPlayerId);
      console.log("description", newGameForm.description);
    };

    // Maybe the function to fetch the players should be
    // outside this function and be async. Kinda feel the
    // watch and async are causing a problem
    /* const fetchPlayer = async (playerId) => {
      let result = await playerStore.getPlayer()
    } */

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
        // Pass playersForSelect as a prop to
        // SelectPlayers, so they show the options
        
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

      // Asign the value of the boardGameId that's
      // coming from the boardGameCard to
      // newGameForm once it's been fetched
      newGameForm.boardGameId = selectedBoardGameId.value;

      // Asign boardgame name to show it on input
      boardGameName.value = boardGame.value.name;

      // Asign boardGameId to newGameForm once it's loaded
      newGameForm.boardGameId = boardGame.value.id;
    });

    return { newGameForm, boardGame, showForm, boardGameName, gameDate, playerStore, playersForSelect, selectedPlayers, enableWinnerSelect, submitGame, selectWinnerFromThesePlayers };
  },
};
</script>

<style></style>
