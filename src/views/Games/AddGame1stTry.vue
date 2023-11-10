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
                <v-select
                  v-model="selectedPlayers"
                  :items="playersForSelect.value"
                  item-title="Name"
                  item-value="Id"
                  chips
                  multiple
                  label="¿Quiénes jugaron?"
                  persistent-hint
                  hint="Hace click en unx jugadorx para seleccionarlx"
                  color="primary"
                >
                </v-select>
              </v-col>
            </v-row>
            <!-- Select Winner -->
            <v-row>
              <v-col>
                <v-select label="¿Quién ganó?" color="primary" :disabled="enableWinnerSelect" :items="selectWinnerFromThesePlayers.value" item-title="Name" item-value="Id"></v-select>
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

    // This function will fetch the individual player by id
    // once selected on selectedPlayers. It returns
    // the player object so that can be stored in
    // selectWinnerFromThesePlayers
    const fetchPlayer = async (id) => {
      return playerStore.getPlayer(id);
    };

    const submitGame = () => {
      console.log("Submitting the form!!");
      console.log("startDate", newGameForm.startDate);
      console.log("boardGameId", newGameForm.boardGameId);
      console.log("playerIdsList", newGameForm.playerIdsList);
      console.log("winnerPlayerId", newGameForm.winnerPlayerId);
      console.log("description", newGameForm.description);
    };

    watch(enableWinnerSelect, (newValue) => {
      console.log("enableWinnerSelect", newValue);

      // When this is true, the user selected players
      // Then here we loop through the selected players,
      // fetch them individually and add them to
      // selectWinnerFromThesePlayers[] so the winner can
      // be selected
      if (!enableWinnerSelect.value) {
        console.log("enableWinnerSelect is false");
        console.log("selected players");
        console.log(selectedPlayers.value);

        // This watch makes sure selectedPlayers is updated
        // if the user adds a new player o unselects one
      }
    });

    // Whenever selectedPlayers changes (meaning, the user
    // selects a player), fetch each player and add it to
    // selectWinnerFromThesePlayers
    watch(selectedPlayers, () => {
      // STARTING OVER
      // 1. When the user clicks on a player, I want to check that id on selectedPlayers
      // - if the id is not on the array, push it
      // - if the id is on the array, delete it
      // 2. Fetch the info on the selected player
      // 3. Show the selected players in selectWinnerFromThesePlayers
      // 4. Everytime there's a change on selectedPlayers, delete everything from
      //    selectWinnerFromThesePlayers and refetch

      if (selectedPlayers.value.length != null) {
        selectedPlayers.value.forEach(async (playerId) => {
          console.log(playerId);
          console.log("check the array that shows the selected players");
          console.log(selectWinnerFromThesePlayers.length);
        });

        // If selectWinnerFromThesePlayers is empty, just
        // push the player in
        if (selectWinnerFromThesePlayers.length === 0) {
          console.log("selectWinnerFromThesePlayers is empty");

          selectedPlayers.value.forEach(async (playerId) => {
            let newPlayer = {};
            newPlayer = fetchPlayer(playerId);
            console.log(newPlayer);
          });
        }

        // If selectWinnerFromThesePlayers has at least
        // 1 player, then we check if the player already exists
      }

      // PREVIOUS TRY
      // it's not printing when the first player is selected
      /* if (selectedPlayers.value.length != null) {
        selectedPlayers.value.forEach(async (playerId) => {
          console.log(playerId);
          console.log(typeof playerId);
          newPlayer = await playerStore.getPlayer(playerId);
          console.log("new player");
          console.log(newPlayer);
          // BEFORE ADDING, gotta check if the id is already
          // in selectWinnerFromThesePlayers
        });

        // This is executing before newPlayer gets its
        // value. Add check to see if the object is empty

        // The check works, but it's still executed before the fetch for newPlayer
        if (Object.keys(newPlayer).length === 0) {
          // This has issues, it's not showing on the template
          // selectWinnerFromThesePlayers.value.push(newPlayer);
          // console.log("selectWinnerFromThesePlayers");
          // console.log(selectWinnerFromThesePlayers); 
          console.log("the object is empty");
        }

        // THIS IS WERE YOU'RE AT
        // Trying to find a way to make the push of newPlayer come
        // AFTER newPlayer is fetched
        // Perhaps leaving it inside the forEach wasn't so bad after all
        // ALSO, gotta add the check to see if it already exists in 
        // the selectWinnerFromThesePlayers[]
        // If I don't, any time the user touches one of the players,
        // it'll be added to the []
        watch(newPlayer, () => {
          if (Object.keys(newPlayer).length === 0) {
            console.log("newPlayer changed and it is no longer empty");
          }
        });
      } */
    });

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
      /* watch(newGameForm, (newValue) => {
        console.log("change in newGameForm", newValue);
        console.log("startDate", newGameForm.startDate);
        console.log("boardGameId", newGameForm.boardGameId);
        console.log("playerIdsList", newGameForm.playerIdsList);
        console.log("winnerPlayerId", newGameForm.winnerPlayerId);
        console.log("description", newGameForm.description);
      }); */

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
