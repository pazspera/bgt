<template>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <p>{{ player.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCard",
  props: ["player"],
};
</script>

<style></style>
