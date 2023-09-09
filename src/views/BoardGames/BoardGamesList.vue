<template>
  <h1>{{ boardGameStore.name }}</h1>
</template>

<script>
import { useBoardGameStore } from "@/stores/BoardGameStore";

export default {
  setup() {
    const boardGameStore = useBoardGameStore();

    return { boardGameStore };
  },
};
</script>

<style></style>
