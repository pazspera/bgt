<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />
  <div class="container my-5">
    <div class="row">
      <v-tabs v-model="tab" color="primary" align-tabs="center" class="mb-4" centered stacked>
        <v-tab :value="1" class="player-tab">
          <router-link class="nav-link internal-nav-link" :to="{ name: 'PlayersList' }"> Todxs lxs jugadores </router-link>
        </v-tab>
        <v-tab :value="2" class="player-tab">
          <router-link class="nav-link internal-nav-link" :to="{ name: 'AddPlayer' }">Agregar nuevx jugador</router-link>
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <v-row>
              <v-col>
                <router-view />
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>

      <!-- <div class="col-12">
        <router-view />
      </div> -->
    </div>
  </div>
</template>

<script>
/* Components */
/* import PlayerList from "@/views/Players/PlayersList.vue"; */
import HeroSection from "@/components/HeroSection.vue";

export default {
  name: "PlayersView",
  components: { /* PlayerList, */ HeroSection },
  data() {
    return {
      heroTitle: "Jugadores",
      bgClass: "playersBg",
      tab: null,
    };
  },
  mounted() {
    document.title = "Jugadores - Board Game Tracker";
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.internal-nav-link {
  color: $black !important;
  padding: 0.5rem 1rem;
  display: block;
  font-family: $font-text;
  font-weight: 700;
  letter-spacing: 0.1rem;
}

.router-link-exact-active {
  color: $primary-light !important;
}

.nav-pills .nav-link {
  border-radius: 0;
}

@media (max-width: 576px) {
  .player-tab {
    max-width: 140px;
  }
}
</style>
