<template>
  <header class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"><img src="@/assets/img/logo_dark.png" /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'BoardGames' }">Ludoteca</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Players' }">Jugadores</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Games' }">Partidas</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="profile" class="navbar-message">
              I'm {{ profile.preferredUsername }}
            </div>
            <div v-else class="navbar-message">
              Logged Out
            </div>
            <div v-if="profile">
              <button @click="signOut" class="button is-danger navbar-message">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar2",
  data() {
    return {
      profile: null,
    };
  },
  methods: {
    async getProfile() {
      const uri = process.env.VUE_APP_BGT_OAUTH_URL + "/userinfo";

      try {
        const res = await fetch(uri, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        this.profile = data;
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    },
    async signOut() {
      const logoutUri = process.env.VUE_APP_BGT_OAUTH_URL + "/sign_out?rd=" + process.env.VUE_APP_BGT_OIDC_LOGOUT_ENCODED;
      window.location.href = logoutUri;
    },
  },
  created() {
    // Automatically fetch the user's profile when the component is created.
    this.getProfile();
  },
};
</script>

<style>
.navbar-message {
  font-size: 18px; /* Adjust the font size as needed */
  font-weight: bold; /* Adjust the font weight as needed */
  padding: 10px; /* Add padding as needed */
  color: white; /* Set the text color to white */
}
</style>
