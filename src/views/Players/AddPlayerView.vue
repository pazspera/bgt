<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model="newPlayerName" class="form-control" required />
          </div>
          <button type="submit" class="btn btn__primary">Agregar jugador</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPlayerView",
  data() {
    return {
      newPlayerName: "",
    };
  },
  mounted(){
    document.title = "Agregar Jugador - Board Game Tracker";
  },
  methods: {
    handleSubmit() {
      let player = {
        name: this.newPlayerName,
      };
      console.log(player);

      fetch("http://localhost:3000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      })
        .then(() => {
          this.$router.push({ name: "Players" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
