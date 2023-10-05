<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <v-container class="my-5">
    <v-row v-if="showForm">
      <v-col cols="12" lg="8" offset-lg="2">
        <h2>Nueva partida de {{ boardGameName }}</h2>
      </v-col>

      <v-col cols="12" lg="8" offset-lg="2">
        <v-form>
          <VueDatePicker v-model="gameDate" auto-apply :enable-time-picker="false"></VueDatePicker>
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
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useGameStore } from "@/stores/GameStore";
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
      console.log("onBeforeMount");
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);

      try {
        boardGame.value = await boardGameStore.getBoardgame(selectedBoardGameId.value);

        if (boardGame.value) {
          console.log("BoardGame: " + boardGame.value.name);
          console.log(showForm.value);
          showForm.value = true;
          console.log(showForm.value);
        }
      } catch (err) {
        console.err("Error fetching boardgame:" + err);
      }

      watch(showForm, (newValue) => {
        console.log("showForm value changed: ", newValue);
      });

      // Asign the value of the boardGameId that's
      // coming from the boardGameCard to
      // newGameForm once it's been fetched
      newGameForm.boardGameId = selectedBoardGameId.value;
      console.log("newGameForm.boardGameId: ", newGameForm.boardGameId);

      // Asign boardgame name to show it on input
      boardGameName.value = boardGame.value.name;

      // Asign boardGameId to newGameForm once it's loaded
      newGameForm.boardGameId = boardGame.value.id;

      console.log(newGameForm.startDate);
      console.log(newGameForm.boardGameId);
    });

    onMounted(async () => {
      console.log("onMounted");
      console.log("Selected boardgame ID: " + selectedBoardGameId.value);
    });

    return { newGameForm, boardGame, showForm, boardGameName, gameDate };
  },
};
</script>

<style></style>
