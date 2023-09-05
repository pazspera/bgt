<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" class="help-icon" icon="mdi-help" size="large" v-bind="props"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="¿Cómo guardar una partida?"></v-toolbar>
            <v-card-text>
              <ol>
                <li class="mb-3">Busca el juego que estás jugando en la barra de búsqueda.</li>
                <li class="mb-3">Agrega el juego a tu ludoteca.</li>
                <li class="mb-3">Una vez que el juego esté en tu ludoteca, apretá el botón de guardar partida y seguí los pasos del formulario.</li>
                <li class="mb-3">¡Felicitaciones! Ya guardaste tu primera partida. Ahora, ¡a seguir jugando!</li>
              </ol>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn variant="text" @click="isActive.value = false">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: "HelpIcon",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.help-icon {
  position: fixed;
  bottom: 70px;
  right: 6vw;
}

.help-icon__text {
  font-size: $size4 !important;
}
</style>
