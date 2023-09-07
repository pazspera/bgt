<template>
  <HeroSection :title="heroTitle" :bg-class="bgClass" />

  <v-container class="my-5">
    <div class="row">
      <!-- <v-tabs v-model="tab" color="primary" align-tabs="center" class="mb-4" centered stacked>
        <v-tab :value="1" class="player-tab">
          <router-link class="nav-link internal-nav-link pa-md-7" :to="{ name: 'PlayersList' }"> Todxs lxs jugadores </router-link>
        </v-tab>
        <v-tab :value="2" class="player-tab">
          <router-link class="nav-link internal-nav-link pa-md-7" :to="{ name: 'AddPlayer' }">Agregar nuevx jugadorx</router-link>
        </v-tab>
      </v-tabs> -->

      <!-- <v-window>
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <v-row>
              <v-col>
                <router-view />
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window> -->

      <div class="col-12">
        <PlayerList />
        <!-- <router-view /> -->
      </div>
    </div>
  </v-container>
  <AddButton :text="btnText" :route="btnRoute" />
</template>

<script>
/* Components */
import PlayerList from "@/views/Players/PlayersList.vue";
import HeroSection from "@/components/HeroSection.vue";
import AddButton from "@/components/AddButton.vue";

export default {
  name: "PlayersView",
  components: { PlayerList, HeroSection, AddButton },
  data() {
    return {
      heroTitle: "Jugadores",
      bgClass: "playersBg",
      btnText: "Agregar jugadorx",
      btnRoute: "AddPlayer",
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

.player-tab {
  box-sizing: border-box;
}

/* Override Vuetify */
.v-btn {
  padding: 0;
}

@media (max-width: 500px) {
  .player-tab,
  .router-link-active {
    width: 125px;
    padding: 0;
  }
}

@media (max-width: 770px) {
  .player-tab,
  .router-link-active {
    width: 200px;
  }
}
</style>
