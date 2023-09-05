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
              <v-list :items="items" item-title="text" item-value="id"></v-list>
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
import { ref } from "vue";
export default {
  name: "HelpIcon",
  setup() {
    const items = ref([
      {
        id: 1,
        text: "Busca el juego que estás jugando en la barra de búsqueda.",
        icon: "mdi-numeric-1",
        props: {
            prependIcon: "mdi-numeric-1"
        }
      },
      {
        id: 2,
        text: "Agrega el juego a tu ludoteca.",
        props: {
            prependIcon: "mdi-numeric-2"
        }
      },
      {
        id: 3,
        text: "Una vez que el juego esté en tu ludoteca, apretá el botón de guardar partida y seguí los pasos del formulario.",
        props: {
            prependIcon: "mdi-numeric-3"
        }
      },
      {
        id: 4,
        text: "¡Felicitaciones! Ya guardaste tu primera partida. Ahora, ¡a seguir jugando!",
        props: {
            prependIcon: "mdi-numeric-4"
        }
      },
    ]);

    return { items };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.help-icon {
  position: fixed;
  bottom: 70px;
  right: 3vw;
}

.help-icon__text {
  font-size: $size4 !important;
}
</style>
