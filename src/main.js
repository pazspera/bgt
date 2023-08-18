import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Old Vuetify installation
/* import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; */
import "vuetify/styles";
// import { createVuetify } from "vuetify/lib/framework.mjs";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import VueSweetalert2 from "vue-sweetalert2";
/* import "sweetalert2/dist/css/sweetalert2.min.css"; */

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
});

let app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(createPinia());
app.use(VueSweetalert2);
app.mount("#app");
