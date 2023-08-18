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
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

/*  Header  */
.navbar {
  background-color: $black !important;
}

.nav-link {
  font-size: $size4;
  font-weight: 500;
  font-family: $font-text;
}

/*  Agrega margin a los nav-links en desktop */
@media (min-width: 996px) {
  .nav-item {
    margin-left: 1.2rem !important;
  }
}

// Override color a los nav-links
.navbar-dark,
.navbar-brand,
.navbar-nav,
.nav-link {
  color: $white !important;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    color: $primary-medium !important;
    transition: all 0.3s ease-in-out;
  }
}

// Color para mostrar página activa en navbar
.active {
  font-weight: 700;
  color: $white !important;
}

// Override color del navbar-toggler
.navbar-dark,
.navbar-toggler {
  color: $white;

  &:hover,
  &:focus {
    color: $primary-medium;
  }
}

// Override color de navbar-dark
.bg-dark {
  background-color: $black !important;
}

// Anchor para arreglar padding link menu
.anchor {
  display: block;
  height: 79px;
  margin-top: -79px;
  visibility: hidden;
}
</style>
