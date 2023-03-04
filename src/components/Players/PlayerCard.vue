<template>
  <div class="card player-card p-2">
    <div class="card-body d-flex justify-content-between align-items-center">
      <p class="m-0 player-name">{{ player.name }}</p>
      <div class="icons">
        <span class="material-icons"> edit </span>
        <span @click="deletePlayer" class="material-icons"> delete </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCard",
  props: ["player"],
  setup(props, context) {
    const deletePlayer = () => {
      let uri = `http://localhost:3000/players/${props.player.id}`;
      fetch(uri, {
        method: "DELETE",
      })
        .then(() => {
          context.emit("deletePlayer", props.player.id);
        })
        .catch((err) => console.log(err));
    };

    return { deletePlayer };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.material-icons {
  cursor: pointer;
  color: $gray-darker;

  &:hover {
    color: $gray-dark;
    opacity: 0.6;
  }
}
.player-card {
  border-radius: 0;
  border: none;
}

.player-name {
  font-size: $size5;
}
</style>
