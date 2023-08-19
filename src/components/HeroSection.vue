<template>
  <section class="hero" :class="bgClass">
    <div class="hero__container container">
      <div class="row">
        <div class="col-12 col-md-9 col-lg-7">
          <h1 class="hero__title mb-5">
            <span>{{ title }}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    bgClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
/*  Hero    */
.hero {
  height: 45vh;
  padding: 1em 0;
  display: flex;
  background-position: center;
  max-width: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  &__title {
    margin: 0.5em 0;
    letter-spacing: 2px;
    font-size: $size1;
  }

  &__text {
    margin: 0 0 1.5em 0;
    font-size: $size1;
  }

  &__title,
  &__text {
    color: $white;
    font-family: $font-title;
    align-self: start;
    justify-self: center;
    text-align: left;
  }

  /* El span pone el fondo de color y así 
    puedo tener que el fondo se mantenga en todo
    el texto sin depender de las col */

  &__title span,
  &__text span {
    background-color: $black;
    max-width: 550px;
    /*  agregar los dos que brave no soporta 
            box-decoration-break solo
         */
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  /*  box-decoration-break en el span junto con 
        text-align en el title/text hacen que el 
        fondo se pegue al contenido del texto
     */

  &__title span {
    font-size: $size1;
    padding: 0.05em 0.3em 0.05em 0.3em;
    line-height: 1.3;
  }

  &__text span {
    font-size: $size1;
    padding: 0.25em 0.7em;
    margin-bottom: 3rem;
    line-height: 1.6;
    font-weight: 300;
  }
}

@media (min-width: 768px) {
  .hero__title span {
    font-size: $sizeXL;
  }
}

.indexBg {
  background-image: url(@/assets/img/hero_bg_home.jpg);
}

.boardGamesBg {
  background-image: url(@/assets/img/hero_bg_boardgames.jpg);
}

.playersBg {
  background-image: url(@/assets/img/hero_bg_players.jpg);
}

.gamesBg {
  background-image: url(@/assets/img/hero_bg_games.jpg);
}
</style>
