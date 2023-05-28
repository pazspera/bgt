import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import VueSweetalert2 from "vue-sweetalert2";
/* import "sweetalert2/dist/css/sweetalert2.min.css"; */

let app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueSweetalert2);
app.mount("#app");
