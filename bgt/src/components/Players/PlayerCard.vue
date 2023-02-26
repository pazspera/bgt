<template>
  <div class="col">
    <div class="card">
      <div class="card-body d-flex justify-content-between align-items-center">
        <p class="m-0">{{ player.name }}</p>
        <div class="icons">
          <span class="material-icons"> edit </span>
          <span class="material-icons"> delete </span>
        </div>
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
