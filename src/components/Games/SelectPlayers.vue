<template>
  <v-select
    item-title="Name"
    item-value="Id"
    chips
    multiple
    :items="allPlayers.value"
    label="¿Quiénes jugaron?"
    persistent-hint
    hint="Hace click en unx jugadorx para seleccionarlx"
    color="primary"
  >
  </v-select>
</template>

<script>
import { reactive } from "vue";
import { onBeforeMount } from "vue";
import {usePlayerStore} from "@/stores/PlayerStore";

export default {
  name: "SelectPlayers",
  setup() {
    const playerStore = usePlayerStore();
    const allPlayers = reactive([]);

    onBeforeMount(async () => {
      try {
        const fetchedPlayers = await playerStore.getPlayers();
        allPlayers.value = fetchedPlayers;
      } catch (err) {
        console.log(err);
      }
    });

    return { playerStore };
  },
};
</script>

<style></style>
