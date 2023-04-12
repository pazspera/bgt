<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model.trim="newPlayerName" class="form-control" required />
          </div>
          <p v-if="error">{{ error }}</p>
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
      players: [],
      error: "",
    };
  },
  created() {
    this.getPlayers();
    console.log(this.players);
  },
  mounted() {
    document.title = "Agregar Jugador - Board Game Tracker";
  },
  methods: {
    handleSubmit() {
      let capitalizedName = this.capitalizeString(this.newPlayerName);

      let player = {
        name: capitalizedName,
      };

      console.log(this.players);

      if (!this.players.includes(player.name)) {
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
      } else {
        this.error = "Jugador ya existente, probá con otro nombre";
      }

      console.log(player);
    },
    capitalizeString(string) {
      let arrayOfWords = string.split(/[\s,\t,\n]+/);
      let capitalizedString;

      let capitalizeWord = (string) => {
        let firstLetter = string[0].toUpperCase();
        let rest = string.slice(1).toLowerCase();
        return firstLetter + rest;
      };

      capitalizedString = arrayOfWords.map(capitalizeWord).join(" ");

      return capitalizedString;
    },
    async getPlayers() {
      try {
        fetch("http://localhost:3000/players")
          .then((res) => res.json())
          .then((data) => (this.players = data));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
